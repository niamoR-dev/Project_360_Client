import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreBase, IMIRequest } from '@infor-up/m3-odin';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { APIWebService } from 'src/app/core/web-services/api.webservice';


@Component({
  selector: 'app-tab-orders',
  templateUrl: './tab-orders.component.html',
  styleUrls: ['./tab-orders.component.css']
})
export class TabOrdersComponent extends CoreBase implements OnInit {

  @ViewChild('orders',{ static: true }) orders?: SohoDataGridComponent;

//////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

  datagridOptions: SohoDataGridOptions = {};
  datagridOptions2: SohoDataGridOptions = {};

  orno:any;

  listOrders: any;
  listLineOrders: any;

  cunoHeader$: any;
  cunoSubscription: Subscription;



//////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////

  constructor(private dataForTabHeaderService: DataForTabHeaderService, private apiWebService: APIWebService, private messageService: SohoMessageService) {
    super('TabOrdersComponent');
  }

  ngOnInit() { // à l'ouverture de l'onglet, ce que l'on codde ici se lance

    this.initGridHeadOrder();
    this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO

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
      this.getOrdersHeadIMIRequest();
    }
  );
}


private getOrdersHeadIMIRequest() { // mettre la IMIRequest

  const requestTest4: IMIRequest = {

    program: 'OIS100MI',
    transaction: 'LstHead',
    record: {
      CUNO: this.cunoHeader$,
      ORSL: '10'
      //ORST: '44'
    },
    outputFields: ['FACI', 'ORNO', 'ORTP', 'CUOR', 'ORDT', 'ORSL', 'ORST',],
    // maxReturnedRecords: 50
  };


  this.apiWebService.callAPI(requestTest4).subscribe(
    data => {

      this.listOrders = data.items;
      this.orders.dataset = this.listOrders;

    });
}



//////////////////////////////////////////////////////////////////// Méthodes qui gère l'affichage Grid ///////////////////////////////////////////////////////////////////////////////////

  private initGridHeadOrder() {                             // méthode qui permet d'afficher les données dans la GRID
    const options: SohoDataGridOptions = {
      selectable: 'single' as SohoDataGridSelectable,
      disableRowDeactivation: true,
      clickToSelect: true,
      alternateRowShading: true,
      cellNavigation: false,
      idProperty: 'LstHead',
      paging: true,
      pagesize: 10,
      indeterminate: false,
      columns: [
        {
          width: 50, id: 'selectionCheckbox', field: '', name: '', sortable: false,
          resizable: false, align: 'center', formatter: Soho.Formatters.SelectionCheckbox, hidden: true
        },
        {
          width: 'auto', id: 'col-rldt', field: 'FACI', name: 'Société/Etablissement',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-orno', field: 'ORNO', name: 'N° CDV',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-ordt', field: 'ORTP', name: 'Type',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-itds', field: '', name: 'Client',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-orsl', field: '', name: 'Nom', // à CHERCHER //CUNM
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-orst', field: 'CUOR', name: 'N°CDV client',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-itds', field: 'ORDT', name: 'Dt.Cde',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cucd', field: 'ORSL', name: 'Statut bas',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-tepy', field: 'ORST', name: 'Statut haut',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-modl', field: '', name: 'Responsable',  //RESP
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-tedl', field: '', name: 'Brut total',   //BRLA
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-oaoblc', field: '', name: 'Net total.', //BRLA
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-ortp', field: '', name: 'Bloc',         //OBLC
          resizable: true, filterType: 'text', sortable: true
        },
      ],
      dataset: this.listOrders,
      emptyMessage: {
        title: 'Aucune commande à afficher',
        icon: 'icon-empty-no-data'
      }
    };
    this.datagridOptions = options;
  }

  //////////////////////////////////////////////////////////////////// Méthodes qui gère la deuxième grid ///////////////////////////////////////////////////////////////////////////////////

  onSelectedLine(args: any[]) {                                        // méthode pour gérer quand on cique sur une ligne

    const newCount = args.length;
    const selected = args && newCount === 1 ? args[0].data : null;

    this.orno = selected.ORNO;

    this.getLineOrders();
  }

  private getLineOrders() { // mettre la IMIRequest

    const requestTest4: IMIRequest = {

      program: 'OIS100MI',
      transaction: 'LstLine',
      record: {
        CUNO: this.cunoHeader$,
        ORNO: this.orno
      },
      outputFields: ['PONR', 'POSX', 'ITNO', 'ITDS','ORQA', 'ALUN', 'CODT', 'ORST'], //il manque CUNO et ORST
      // maxReturnedRecords: 50
    };


    this.apiWebService.callAPI(requestTest4).subscribe(
      data => {

        this.listLineOrders = data.items;
        this.initGridLine();      // lance l'initialisation de la Grid

      },(error) => {                                                    // gestion d'erreur selon la méthode que l'on a déclaréer en dessous
        console.error('Erreur API :', error);
        this.handleError('Échec de l\'exécution de l\'API ', error);
      });
}

private initGridLine(){
  const options: SohoDataGridOptions = {
    selectable: 'single' as SohoDataGridSelectable,
    disableRowDeactivation: true,
    clickToSelect: true,
    alternateRowShading: true,
    cellNavigation: false,
    idProperty: 'listLineOrders',
    paging: false,
    pagesize: 15,
    indeterminate: false,

    columns: [
      {
        width: 50, id: 'selectionCheckbox', field: '', name: '', sortable: false,
        resizable: false, align: 'center', formatter: Soho.Formatters.SelectionCheckbox, hidden: true
      },
      {
        width: 'auto', id: 'col-adrt', field: 'PONR', name: 'Ligne',
        resizable: true, filterType: 'text', sortable: true
      },
      {
        width: 'auto', id: 'col-adid', field: 'POSX', name: 'Sf',
        resizable: true, filterType: 'text', sortable: true
      },
      {
        width: 'auto', id: 'col-cunm', field: 'ITNO', name: 'Code article',
        resizable: true, filterType: 'text', sortable: true
      },
      {
        width: 'auto', id: 'col-cunm', field: 'ITDS', name: 'Nom',
        resizable: true, filterType: 'text', sortable: true
      },
      {
        width: 'auto', id: 'col-cua1', field: 'ORQA', name: 'Qté Cdé UR',
        resizable: true, filterType: 'text', sortable: true
      },
      {
        width: 'auto', id: 'col-adid', field: 'ALUN', name: 'UnR',
        resizable: true, filterType: 'text', sortable: true
      },
      {
        width: 'auto', id: 'col-cunm', field: 'CODT', name: 'DtLvCf',
        resizable: true, filterType: 'text', sortable: true
      },
      {
        width: 'auto', id: 'col-cua1', field: 'ORST', name: 'st',
        resizable: true, filterType: 'text', sortable: true
      },
    ],
    dataset: this.listLineOrders,
    emptyMessage: {
      title: 'Aucune ligne de commande à afficher',
      icon: 'icon-empty-no-data'
    }
  };
  this.datagridOptions2 = options;
}

}
