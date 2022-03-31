import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { ContractsWebService } from 'src/app/core/web-services/contracts.webservice';

@Component({
   selector: 'app-tab-contracts',
   templateUrl: './tab-contracts.component.html',
   styleUrls: ['./tab-contracts.component.css']
})
export class TabContractsComponent extends CoreBase implements OnInit {


   datagridOptions: SohoDataGridOptions = {};

   listContracts: any[]; // tableau pour enregistrer le retour d'API des articles du client

   cuno: any;
   agno: any;
   stdt: any;
   agtp: any;
   tx40: any;
   agst: any;




   listDetailContracts: any;




   constructor(private miService: MIService, private userService: UserService, private contractsWebService: ContractsWebService) {
      super('TabContractsComponent');
   }

   ngOnInit() {

      this.recoveryDataFromApi();

   }
   private recoveryDataFromApi() {
      this.contractsWebService.listeContracts().subscribe(data => {
         console.log('ngoninit', data)
         this.listContracts = data;
         this.initGridContracts();
      });

   }

   private initGridContracts() {                             // méthode qui permet d'afficher les données dans la GRID
      const options: SohoDataGridOptions = {
         selectable: 'single' as SohoDataGridSelectable,
         disableRowDeactivation: true,
         clickToSelect: true,
         alternateRowShading: true,
         cellNavigation: false,
         idProperty: 'List',
         paging: true,
         pagesize: 10,
         indeterminate: false,
         columns: [
            {
               width: 50, id: 'selectionCheckbox', field: '', name: '', sortable: false,
               resizable: false, align: 'center', formatter: Soho.Formatters.SelectionCheckbox, hidden: true
            },
            {
               width: 'auto', id: 'col-cuno', field: 'UYCUNO', name: 'Client',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-agno', field: 'UYAGNO', name: 'Cde Ouv',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-stdt', field: 'UYSTDT', name: 'Dt Déb',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-agtp', field: 'UYAGTP', name: 'Typ',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-tx40', field: 'UYTX40', name: 'Désignation',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-agst', field: 'UYAGST', name: 'Stt',
               resizable: true, filterType: 'text', sortable: true
            },

         ],
         dataset: this.listContracts,
         emptyMessage: {
            title: 'Aucun article client à afficher',
            icon: 'icon-empty-no-data'
         }
      };
      this.datagridOptions = options;
   }



   // onSelectedLine(args: any[]) {                                        // méthode pour gérer quand on cique sur une ligne

   //    const newCount = args.length;
   //    const selected = args && newCount === 1 ? args[0].data : null;
   //    this.InitDetailContacts();
   //    //this.show = true;

   //    this.itds = selected.ORITDS;
   // }

   // private InitDetailItemCustomerList() { // API OIS005MI

   //    this.itemsContractsWebService.listDetailContracts().subscribe(data => {
   //       this.listDetailContracts = data;

   //       this.cuno = this.listDetailContracts[0].CUNO;
   //       this.agno = this.listDetailContracts[0].AGNO;
   //       this.stdt = this.listDetailContracts[0].STDT;
   //       this.agtp = this.listDetailContracts[0].AGTP;
   //       this.tx40 = this.listDetailContracts[0].TX40;
   //       this.agst = this.listDetailContracts[0].AGST;

   //       console.log(" GetBasicData  ", this.listDetailContracts)  // la virgule dans le console log permets de lire à 'intérieur de l'objet

   //    });
   // }


}































































































































// import { Component, OnInit } from '@angular/core';
// import { CoreBase } from '@infor-up/m3-odin';
// import { Subscription } from 'rxjs';
// import { CunoHeaderService } from 'src/app/core/services/cuno-header-service/cuno-header.service';
// import { ContractsWebService } from 'src/app/core/web-services/contracts.webservice';

// @Component({
//    selector: 'app-tab-contrats',
//    templateUrl: './tab-contracts.component.html',
//    styleUrls: ['./tab-contracts.component.css']
// })
// export class TabContractsComponent extends CoreBase implements OnInit {


//    //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

//    cunoHeader$: any;
//    cunoSubscription: Subscription;
//    listContractsClient: any[]; // tableau pour enregistrer le retour d'API des adresses d'un client


//    //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


//    constructor(private contractsWebService: ContractsWebService, private cunoHeaderService: CunoHeaderService) {
//       super('TabContractsComponent');
//    }

//    //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////



//    ngOnInit() {
//       this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO

//       this.sendCunoToContractsWebService(); // lancement de la méthode de récupération du CUNO

//       //this.recoveryDataFromAPI(); // lancement de la méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

//    }



//    //////////////////////////////////////////////////////////////////// Méthodes qui gère l'affichage Grid ///////////////////////////////////////////////////////////////////////////////////


//    cunoHeaderMethod() {    // méthode observable pour récupérer la CUNO de la dropdown du header
//       this.cunoSubscription = this.cunoHeaderService.cunoSubject.subscribe(
//          (data: any) => {
//             this.cunoHeader$ = data;
//          }
//       );
//       this.cunoHeaderService.subjectMethod();
//    }



//    sendCunoToContractsWebService() {       // méthode obesevable pour envoyer la CUNO de le webService de Adresse
//       this.contractsWebService.recoveryCunoFromHeader(this.cunoHeader$).subscribe();
//    }



   // recoveryDataFromAPI() {             // méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

   //    this.contractsWebService.listContracts().subscribe(data => {
   //       this.listContractsClient = data;

   //       this.initGridContracts();      // lance l'initialisation de la Grid
   //    });


   // }




//}
