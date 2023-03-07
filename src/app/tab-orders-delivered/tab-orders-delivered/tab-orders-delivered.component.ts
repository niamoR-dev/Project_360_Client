import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { FeeWebService } from 'src/app/core/web-services/fee.webservice';

@Component({
  selector: 'app-tab-orders-delivered',
  templateUrl: './tab-orders-delivered.component.html',
  styleUrls: ['./tab-orders-delivered.component.css']
})
export class TabOrdersDeliveredComponent extends CoreBase implements OnInit {

  //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////
  datagridOptions: SohoDataGridOptions = {};

  cunoHeader$: any;
  cunoSubscription: Subscription;
  listFeeClient: any[]; // tableau pour enregistrer le retour d'API des adresses d'un client


  //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////

  constructor(private feeWebService: FeeWebService, private dataForTabHeaderService: DataForTabHeaderService) {
    super('TabOrdersDeliveredComponent');
  }

  ngOnInit() {
    this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO
  }

  //////////////////////////////////////////////////////////////////// Méthodes qui gère l'affichage Grid ///////////////////////////////////////////////////////////////////////////////////


  cunoHeaderMethod() {    // méthode observable pour récupérer la CUNO de la dropdown du header
    this.cunoSubscription = this.dataForTabHeaderService.cunoSubject.subscribe(
      (data: any) => {
        this.cunoHeader$ = data;
      }
    );
    this.dataForTabHeaderService.subjectMethod();
  }



  sendCunoToFeeWebService() {       // méthode obesevable pour envoyer la CUNO de le webService de Adresse
    this.feeWebService.recoveryCunoFromHeader(this.cunoHeader$).subscribe();
  }

}
