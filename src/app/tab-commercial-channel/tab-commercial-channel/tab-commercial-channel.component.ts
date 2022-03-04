import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { CunoHeaderService } from 'src/app/core/services/cuno-header-service/cuno-header.service';
import { CommercialChannelWebService } from 'src/app/core/web-services/commercial-channel.webservice';

@Component({
   selector: 'app-tab-commercial-channel',
   templateUrl: './tab-commercial-channel.component.html',
   styleUrls: ['./tab-commercial-channel.component.css']
})
export class TabCommercialChannelComponent extends CoreBase implements OnInit {


   //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

   cunoHeader$: any;
   cunoSubscription: Subscription;
   listCommercialChannelClient: any[]; // tableau pour enregistrer le retour d'API des adresses d'un client


   //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


   constructor(private commercialChannelWebService: CommercialChannelWebService, private cunoHeaderService: CunoHeaderService) {
      super('TabCommercialChannelComponent');
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
      this.commercialChannelWebService.recoveryCunoFromHeader(this.cunoHeader$).subscribe();
   }



   // recoveryDataFromAPI() {             // méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

   //    this.commercialChannelWebService.listCommercialChannel().subscribe(data => {
   //       this.listCommercialChannelClient = data;

   //       this.initGridCommercialChannel();      // lance l'initialisation de la Grid
   //    });


   // }



}
