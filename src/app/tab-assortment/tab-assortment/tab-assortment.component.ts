import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { CunoHeaderService } from 'src/app/core/services/cuno-header-service/cuno-header.service';
import { AssortmentWebService } from 'src/app/core/web-services/assortment.webservice';

@Component({
   selector: 'app-tab-assortment',
   templateUrl: './tab-assortment.component.html',
   styleUrls: ['./tab-assortment.component.css']
})
export class TabAssortmentComponent extends CoreBase implements OnInit {



   //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

   cunoHeader$: any;
   cunoSubscription: Subscription;
   listAssortmentClient: any[]; // tableau pour enregistrer le retour d'API des adresses d'un client


   //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


   constructor(private assortmentWebService: AssortmentWebService, private cunoHeaderService: CunoHeaderService) {
      super('TabAssortmentComponent');
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
      this.assortmentWebService.recoveryCunoFromHeader(this.cunoHeader$).subscribe();
   }



   // recoveryDataFromAPI() {             // méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

   //    this.assortmentWebService.listeAdresses().subscribe(data => {
   //       this.listAssortmentClient = data;

   //       this.initGridAdresses();      // lance l'initialisation de la Grid
   //    });


   // }



}
