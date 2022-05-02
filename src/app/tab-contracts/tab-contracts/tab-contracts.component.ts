import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { CunoHeaderService } from 'src/app/core/services/cuno-header-service/cuno-header.service';
import { ContractsWebService } from 'src/app/core/web-services/contracts.webservice';

@Component({
   selector: 'app-tab-contracts',
   templateUrl: './tab-contracts.component.html',
   styleUrls: ['./tab-contracts.component.css']
})
export class TabContractsComponent extends CoreBase implements OnInit {

   //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

   datagridOptions: SohoDataGridOptions = {};
   cunoHeader$: any;
   cunoSubscription: Subscription;
   listContractsClient: any[]; // tableau pour enregistrer le retour d'API des adresses d'un client

   cuno: any;
   agno: any;
   prex: any;
   agdt: any;
   stdt: any;
   agtp: any;
   tx40: any;
   datagridOptions: SohoDataGridOptions = {};

   agno2: any;

   detailsContractsGetBasicData: any[];
   detailsContractsGetOrderInfo: any[];
   

   show: boolean; // permets l'affichage de détails au clique

   listContracts: any[]; // tableau pour enregistrer le retour d'API des articles du client

   cuno: any;
   agno: any;
   stdt: any;
   agtp: any;
   tx40: any;
   agst: any;




   listDetailContracts: any;

   //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


   constructor(private contractsWebService: ContractsWebService, private cunoHeaderService: CunoHeaderService) {
      super('TabContractsComponent');
   }

   //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////



   ngOnInit() {                                                   // à l'ouverture de l'onglet, ce que l'on codde ici se lance

      this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO
   ngOnInit() {

      this.sendCunoToAddressesWebService(); // lancement de la méthode de récupération du CUNO
      this.recoveryDataFromApi();

      this.recoveryDataFromAPI(); // lancement de la méthode de récupération des donnés qui lance aussi l'initialisation de la Grid
   }

   //////////////////////////////////////////////////////////////////// Méthodes qui gère l'affichage Grid ///////////////////////////////////////////////////////////////////////////////////

   private recoveryDataFromApi() {
      this.contractsWebService.listContracts().subscribe(data => {
         console.log('ngoninit', data)
         this.listContracts = data;
         this.initGridContracts();
      });

   }


   cunoHeaderMethod() {    // méthode observable pour récupérer la CUNO de la dropdown du header
      this.cunoSubscription = this.cunoHeaderService.cunoSubject.subscribe(
         (data: any) => {
            this.cunoHeader$ = data;

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



   sendCunoToAddressesWebService() {       // méthode obesevable pour envoyer la CUNO de le webService de Adresse
      this.contractsWebService.recoveryCunoFromHeader(this.cunoHeader$).subscribe();
   }



   recoveryDataFromAPI() {             // méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

      this.contractsWebService.listeContracts().subscribe(data => {
         this.listContractsClient = data;

         this.initGridAdresses();      // lance l'initialisation de la Grid
      });
   }

   private initGridAdresses() {                             // méthode qui permet d'afficher les données dans la GRID
      const options: SohoDataGridOptions = {
         selectable: 'single' as SohoDataGridSelectable,
         disableRowDeactivation: true,
         clickToSelect: true,
         alternateRowShading: true,
         cellNavigation: false,
         idProperty: 'ListAddresses',
         paging: true,
         pagesize: 10,
         indeterminate: false,
         columns: [
            {
               width: 50, id: 'selectionCheckbox', field: '', name: '', sortable: false,
               resizable: false, align: 'center', formatter: Soho.Formatters.SelectionCheckbox, hidden: true
            },
            {
               width: 'auto', id: 'col-adrt', field: 'CUNO', name: 'Client',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-adid', field: 'AGNO', name: 'Code ouverture',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-cunm', field: 'STDT', name: 'Date Debut',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-cua1', field: 'AGTP', name: 'type',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-cua1', field: 'TX40', name: 'Designation',
               resizable: true, filterType: 'text', sortable: true
            },
            
         ],
         dataset: this.listContractsClient,
         emptyMessage: {
            title: 'Aucune adresse à afficher',
            icon: 'icon-empty-no-data'
         }
      };
      this.datagridOptions = options;
   }

   onSelectedLine(args: any[]) {                                        // méthode pour gérer quand on cique sur une ligne

      const newCount = args.length;
      const selected = args && newCount === 1 ? args[0].data : null;

      this.show = true;

      this.InitDetailContractGetBasicData();

      this.cuno = selected.CUNO;
      this.agno = selected.AGNO;
      this.prex = selected.PREX;
      this.agdt = selected.AGDT;
      this.stdt = selected.STDT;
      this.agtp = selected.AGTP;
      this.tx40 = selected.TX40;
      
      this.agno2 = selected.AGNO;

      this.EnvoiAGNO(this.agno2 = selected.AGNO);
   }

      private EnvoiAGNO(agno2: any){
         return agno2;
      }

      private InitDetailContractGetBasicData() { // API 610 GetBasicData

      this.contractsWebService.detailsContractsGetBasicData().subscribe(data => {
         this.detailsContractsGetBasicData = data;

         this.cuno = this.detailsContractsGetBasicData[0].CUNO;
         this.agno = this.detailsContractsGetBasicData[0].AGNO;
         this.prex = this.detailsContractsGetBasicData[0].PREX;
         this.agdt = this.detailsContractsGetBasicData[0].AGDT;
         this.stdt = this.detailsContractsGetBasicData[0].STDT;
         this.agtp = this.detailsContractsGetBasicData[0].AGTP;
         this.tx40 = this.detailsContractsGetBasicData[0].TX40;

         //  console.log(" GetBasicData  ", this.detailsAddressesGetBasicData)  // la virgule d ans le console log permets de lire à 'intérieur de l'objet

      });
   }

   //////////////////////////////////////////////////////////////////// Méthodes qui gère l'affichage Grid ///////////////////////////////////////////////////////////////////////////////////



   sendCunoToContractsWebService() {       // méthode obesevable pour envoyer la CUNO de le webService de Adresse
      this.contractsWebService.recoveryCunoFromHeader(this.cunoHeader$).subscribe();
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
