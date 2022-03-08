import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { CunoHeaderService } from 'src/app/core/services/cuno-header-service/cuno-header.service';
import { GeneralInfoWebService } from 'src/app/core/web-services/general-info.webservice';

@Component({
   selector: 'app-tab-general-info',
   templateUrl: './tab-general-info.component.html',
   styleUrls: ['./tab-general-info.component.css']
})
export class TabGeneralInfoComponent extends CoreBase implements OnInit {


   //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

   cunoHeader$: any;
   cunoSubscription: Subscription;
   listGeneralInfoClient: any[]; // tableau pour enregistrer le retour d'API des adresses d'un client


   //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


   constructor(private generalInfoWebService: GeneralInfoWebService, private cunoHeaderService: CunoHeaderService) {
      super('TabGeneralInfoComponent');
   }

   //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////



   ngOnInit() {
      this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO

      this.sendCunoToGeneralInfoWebService(); // lancement de la méthode de récupération du CUNO

      //this.recoveryDataFromAPI(); // lancement de la méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

   }



   //////////////////////////////////////////////////////////////////// Méthodes qui gère l'affichage Grid ///////////////////////////////////////////////////////////////////////////////////


   cunoHeaderMethod() {    // méthode observable pour récupérer la CUNO de la dropdown du header
      this.cunoHeaderService.cunoSubject.subscribe(
         (data: any) => {
            this.cunoHeader$ = data;
         }
      );
   }



   sendCunoToGeneralInfoWebService() {       // méthode obesevable pour envoyer la CUNO de le webService de Adresse
      this.generalInfoWebService.recoveryCunoFromHeader(this.cunoHeader$).subscribe();
   }



   // recoveryDataFromAPI() {             // méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

   //    this.generalInfoWebService.listGeneralInfo().subscribe(data => {
   //       this.listGeneralInfoClient = data;

   //       this.initGridGeneralInfo();      // lance l'initialisation de la Grid
   //    });


   // }



}
