import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { CunoHeaderService } from 'src/app/core/services/cuno-header-service/cuno-header.service';
import { ContractsWebService } from 'src/app/core/web-services/contracts.webservice';

@Component({
   selector: 'app-tab-contrats',
   templateUrl: './tab-contracts.component.html',
   styleUrls: ['./tab-contracts.component.css']
})
export class TabContractsComponent extends CoreBase implements OnInit {


   //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

   cunoHeader$: any;
   cunoSubscription: Subscription;
   listContractsClient: any[]; // tableau pour enregistrer le retour d'API des adresses d'un client


   //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


   constructor(private contractsWebService: ContractsWebService, private cunoHeaderService: CunoHeaderService) {
      super('TabContractsComponent');
   }

   //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////



   ngOnInit() {
      this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO

      this.sendCunoToContractsWebService(); // lancement de la méthode de récupération du CUNO

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



   sendCunoToContractsWebService() {       // méthode obesevable pour envoyer la CUNO de le webService de Adresse
      this.contractsWebService.recoveryCunoFromHeader(this.cunoHeader$).subscribe();
   }



   // recoveryDataFromAPI() {             // méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

   //    this.contractsWebService.listContracts().subscribe(data => {
   //       this.listContractsClient = data;

   //       this.initGridContracts();      // lance l'initialisation de la Grid
   //    });


   // }



}
