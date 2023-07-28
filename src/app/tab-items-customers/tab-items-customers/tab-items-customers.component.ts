import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreBase, IMIRequest } from '@infor-up/m3-odin';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { APIWebService } from 'src/app/core/web-services/api.webservice';

@Component({
   selector: 'app-tab-items-customers',
   templateUrl: './tab-items-customers.component.html',
   styleUrls: ['./tab-items-customers.component.css'],
})
export class TabItemsCustomersComponent extends CoreBase implements OnInit {

  @ViewChild('itemsCustomer',{ static: true }) itemsCustomer?: SohoDataGridComponent;

//////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////


  datagridOptions: SohoDataGridOptions = {};


  popn: any;
  itds: any;
  alum: any;
  d2qt: any;
  d3qt: any;
  resp: any;
  adcu: any;

  varitno: any;

  show: boolean; // permets l'affichage de détails au clique

  listItemsCustomer: any; // tableau pour enregistrer le retour d'API des articles du client (item customers)
  listDetailItemCustomer: any; // tableau pour enregistrer le details article client (item customers)

  cunoHeader$: any;
  cunoSubscription: Subscription;

//////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


   constructor(private dataForTabHeaderService: DataForTabHeaderService,  private apiWebService: APIWebService,private messageService: SohoMessageService) {
      super('TabItemsCustomersComponent');
   }

//////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////


   ngOnInit() {                           // à l'ouverture de l'onglet, ce que l'on codde ici se lance
    this.initGridItemsCustomer();
    this.cunoHeaderMethod();              // lancement de la méthode de récupération du CUNO
  }

//////////////////////////////////////////////////////////////////// Méthodes ngOnInit  ///////////////////////////////////////////////////////////////////////////////////


private handleError(message: string, error?: any) {
  const buttons = [{ text: 'Ok', click: (e, modal) => { modal.close(); } }];
  this.messageService.error()
    .title('An error occured')
    .message(message + '. More details might be available in the browser console.')
    .buttons(buttons)
    .open();
}


private cunoHeaderMethod() {    // méthode observable pour récupérer la CUNO de la dropdown du header
  this.cunoSubscription = this.dataForTabHeaderService.cunoSubject.subscribe(
    (data: any) => {
      this.cunoHeader$ = data;
      this.getItemsCustomerIMIRequest();
    }
  );
}


private getItemsCustomerIMIRequest() { // mettre la IMIRequest

  const requestTest4: IMIRequest = {

    program: 'OIS005MI',
    transaction: 'List',
    record: {
      CUNO: this.cunoHeader$
    },
    outputFields: ['CUNO', 'ITNO', 'ITDS', 'AGTP', 'TX40', 'AGST'],
    // maxReturnedRecords: 50
  };


  this.apiWebService.callAPI(requestTest4).subscribe(
    data => {

      this.listItemsCustomer = data.items;
      this.itemsCustomer.dataset = this.listItemsCustomer;

    },(error) => {
      // gestion d'erreur selon la méthode que l'on a déclaréer en dessous
     console.error('Erreur API :', error);
     this.handleError('Échec de l\'exécution de l\'API ', error);
   });
}

//////////////////////////////////////////////////////////////////// Méthodes qui gère l'affichage Grid ///////////////////////////////////////////////////////////////////////////////////
//.filter('CUNO' === this.cunoHeader$);



   private initGridItemsCustomer() { // méthode qui permet d'afficher les données dans la GRID
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
         filterable: true,
         filterWhenTyping: true,
         columns: [
            {
               width: 50, id: 'selectionCheckbox', field: '', name: '', sortable: false,
               resizable: false, align: 'center', formatter: Soho.Formatters.SelectionCheckbox, hidden: true
            },
            {
               width: 'auto', id: 'col-cuno', field: 'CUNO', name: 'Code Client',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-itno', field: 'ITNO', name: 'Code article',
               resizable: true, sortable: true
            },
            {
               width: 'auto', id: 'col-itds', field: 'ITDS', name: 'Nom',
               resizable: true, sortable: true
            },
         ],
         dataset: this.listItemsCustomer,
         emptyMessage: {
            title: 'Aucun article client à afficher',
            icon: 'icon-empty-no-data'
         }
      };
      this.datagridOptions = options;

      console.log(this.listItemsCustomer);
   }

//////////////////////////////////////////////////////////////////// Méthodes qui gère le formulaire d'affichage Détail ///////////////////////////////////////////////////////////////////////////////////


   onSelectedLine(args: any[]) {                                   // méthode pour gérer quand on cique sur une ligne

      const newCount = args.length;
      const selected = args && newCount === 1 ? args[0].data : null;

      this.show = true;

      this.varitno = selected.ITNO;

      this.popn = selected.POPN;
      this.alum = selected.ALUM;
      this.d2qt = selected.D2QT;
      this.d3qt = selected.D3QT;
      this.resp = selected.RESP;
      this.adcu = selected.ADCU;


      this.InitDetailItemCustomerList();
   }

   private InitDetailItemCustomerList() { // API OIS005MI

    const requestDetailItemsCustomers: IMIRequest = {

      program: 'OIS005MI',
      transaction: 'LstByItem',
      record: {
        ITNO: this.varitno
      },
      outputFields: ['POPN', 'ALUM', 'D2QT', 'D3QT', 'RESP', 'ADCU'],
      // maxReturnedRecords: 50
    };

    this.apiWebService.callAPI(requestDetailItemsCustomers).subscribe(data => {

      this.popn = data[0].POPN;
      this.alum = data[0].ALUM;
      this.d2qt = data[0].D2QT;
      this.d3qt = data[0].D3QT;
      this.resp = data[0].RESP;
      this.adcu = data[0].ADCU;

    });

   }

   private ngOnDestroy() {               // obligatoire dans chaque onglet dès qu'on a une variable : Subscription, va fermer l'observable à la fermeture de l'onglet
    console.log("UNSUBSCRIBE Adresse")  // permets d'optimiser la gestion débit de données
    this.cunoSubscription.unsubscribe();
  }
}
