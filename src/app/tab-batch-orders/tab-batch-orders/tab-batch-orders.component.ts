import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { CunoHeaderService } from 'src/app/core/services/cuno-header-service/cuno-header.service';
import { BatchOrdersWebService } from 'src/app/core/web-services/batch-orders.webservice';

@Component({
   selector: 'app-tab-batchOrders',
   templateUrl: './tab-batch-orders.component.html',
   styleUrls: ['./tab-batch-orders.component.css']
})
export class TabBatchOrdersComponent extends CoreBase implements OnInit {


   //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

   cunoHeader$: any;
   cunoSubscription: Subscription;
   listBatchOrdersClient: any[]; // tableau pour enregistrer le retour d'API des adresses d'un client


   //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


   constructor(private batchOrdersWebService: BatchOrdersWebService, private cunoHeaderService: CunoHeaderService) {
      super('TabBatchOrdersComponent');
   }

   //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////



   ngOnInit() {
      this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO

      this.sendCunoToAddressesWebService(); // lancement de la méthode de récupération du CUNO

      //this.recoveryDataFromAPI(); // lancement de la méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

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



   sendCunoToAddressesWebService() {       // méthode obesevable pour envoyer la CUNO de le webService de Adresse
      this.batchOrdersWebService.recoveryCunoFromHeader(this.cunoHeader$).subscribe();
   }



   // recoveryDataFromAPI() {             // méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

   //    this.batchOrdersWebService.listBatchOrders().subscribe(data => {
   //       this.listBatchOrdersClient = data;

   //       this.initGridBatchOrders();      // lance l'initialisation de la Grid
   //    });


   // }



}
