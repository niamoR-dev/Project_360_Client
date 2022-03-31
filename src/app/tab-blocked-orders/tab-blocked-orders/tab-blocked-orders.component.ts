import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { CunoHeaderService } from 'src/app/core/services/cuno-header-service/cuno-header.service';
import { BlockedOrdersWebService } from 'src/app/core/web-services/blocked-orders.webservice';

@Component({
   selector: 'app-tab-blocked-orders',
   templateUrl: './tab-blocked-orders.component.html',
   styleUrls: ['./tab-blocked-orders.component.css']
})
export class TabBlockedOrdersComponent extends CoreBase implements OnInit {


   //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

   cunoHeader$: any;
   cunoSubscription: Subscription;
   listCommercialChannelClient: any[]; // tableau pour enregistrer le retour d'API des adresses d'un client


   //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


   constructor(private blockedOrdersWebService: BlockedOrdersWebService, private cunoHeaderService: CunoHeaderService) {
      super('TabBlockedOrdersComponent');
   }

   //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////



   ngOnInit() {
      this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO

      this.sendCunoToCommercialChannelWebService(); // lancement de la méthode de récupération du CUNO

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



   sendCunoToCommercialChannelWebService() {       // méthode obesevable pour envoyer la CUNO de le webService de Adresse
      this.blockedOrdersWebService.recoveryCunoFromHeader(this.cunoHeader$).subscribe();
   }



   // recoveryDataFromAPI() {             // méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

   //    this.commercialChannelWebService.listCommercialChannel().subscribe(data => {
   //       this.listCommercialChannelClient = data;

   //       this.initGridCommercialChannel();      // lance l'initialisation de la Grid
   //    });


   // }



}
