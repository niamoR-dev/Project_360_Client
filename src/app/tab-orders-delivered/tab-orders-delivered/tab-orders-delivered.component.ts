import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { CunoHeaderService } from 'src/app/core/services/cuno-header-service/cuno-header.service';
import { FeeWebService } from 'src/app/core/web-services/fee.webservice';

@Component({
   selector: 'app-tab-orders-delivered',
   templateUrl: './tab-orders-delivered.component.html',
   styleUrls: ['./tab-orders-delivered.component.css']
})
export class TabOrdersDeliveredComponent extends CoreBase implements OnInit {

      //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

      cunoHeader$: any;
      cunoSubscription: Subscription;
      listFeeClient: any[]; // tableau pour enregistrer le retour d'API des adresses d'un client
   
   
      //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////

   constructor(private feeWebService: FeeWebService, private cunoHeaderService: CunoHeaderService) {
      super('TabOrdersDeliveredComponent');
   }

   ngOnInit(): void {
   }

      //////////////////////////////////////////////////////////////////// Méthodes qui gère l'affichage Grid ///////////////////////////////////////////////////////////////////////////////////


      cunoHeaderMethod() {    // méthode observable pour récupérer la CUNO de la dropdown du header
         this.cunoSubscription = this.cunoHeaderService.cunoSubject.subscribe(
            (data: any) => {
               this.cunoHeader$ = data;
            }
         );
         this.cunoHeaderService.subjectMethod();
      }
   
   
   
      sendCunoToFeeWebService() {       // méthode obesevable pour envoyer la CUNO de le webService de Adresse
         this.feeWebService.recoveryCunoFromHeader(this.cunoHeader$).subscribe();
      }

}
