import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreBase, IMIRequest } from '@infor-up/m3-odin';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { APIWebService } from 'src/app/core/web-services/api.webservice';

@Component({
  selector: 'app-tab-blocked-orders',
  templateUrl: './tab-blocked-orders.component.html',
  styleUrls: ['./tab-blocked-orders.component.css']
})
export class TabBlockedOrdersComponent extends CoreBase implements OnInit {

  @ViewChild('blockedOrder',{ static: true }) blockedOrder?: SohoDataGridComponent;

//////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////


  datagridOptions: SohoDataGridOptions = {};
  datagridOptions2: SohoDataGridOptions = {};

  orno: any;

  listBlockedOrder: any;
  listDeliveredOrders: any; // tableau pour enregistrer le retour d'API des commande livrées

  cunoHeader$: any;
  cunoSubscription: Subscription;

  orstStatut: 66;

//////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


  constructor(private dataForTabHeaderService: DataForTabHeaderService, private apiWebService: APIWebService,private messageService: SohoMessageService) {
    super('TabBlockedOrdersComponent');
  }

//////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////


  ngOnInit() {
    this.initGridBlockedOrder();
    this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO

  }



//////////////////////////////////////////////////////////////////// Méthodes qui gère l'affichage Grid ///////////////////////////////////////////////////////////////////////////////////


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
        this.getBlockedOrderIMIRequest();
      }
    );
  }


  private getBlockedOrderIMIRequest() { // mettre la IMIRequest

    const requestTest4: IMIRequest = {

      program: 'OIS100MI',
      transaction: 'LstHead',
      record: {
        CUNO: this.cunoHeader$
      },
      outputFields: ['FACI', 'ORNO', 'ORTP'], // il manque OBLC PYNO CUNO NTLA CUCD
      // maxReturnedRecords: 50
    };


    this.apiWebService.callAPI(requestTest4).subscribe(
      data => {

        this.listBlockedOrder = data.items;
        this.blockedOrder.dataset = this.listBlockedOrder;

      },(error) => {
         // gestion d'erreur selon la méthode que l'on a déclaréer en dessous
        console.error('Erreur API :', error);
        this.handleError('Échec de l\'exécution de l\'API ', error);
      });
  }

  private initGridBlockedOrder() {                             // méthode qui permet d'afficher les données dans la GRID
    const options: SohoDataGridOptions = {
      selectable: 'single' as SohoDataGridSelectable,
      disableRowDeactivation: true,
      clickToSelect: true,
      alternateRowShading: true,
      cellNavigation: false,
      idProperty: 'ListBlockedOrderHead',
      paging: true,
      pagesize: 10,
      indeterminate: false,

      columns: [
        {
          width: 50, id: 'selectionCheckbox', field: '', name: '', sortable: false,
          resizable: false, align: 'center', formatter: Soho.Formatters.SelectionCheckbox, hidden: true
        },
        {
          width: 'auto', id: 'col-adrt', field: '', name: 'Code Blocage',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-adid', field: 'FACI', name: 'Société/Etablissement',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: '', name: 'Payeur',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cua1', field: 'ORNO', name: 'N°CDV',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-adid', field: '', name: 'Client',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'ORTP', name: 'Type',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cua1', field: '', name: 'CA Total',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: '', name: 'Dev',
          resizable: true, filterType: 'text', sortable: true
        },
      ],
      dataset: this.listBlockedOrder,
      emptyMessage: {
        title: 'Aucune Commande Bloqué à afficher',
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

    this.getDeliveredOrders();
  }

  private getDeliveredOrders() { // mettre la IMIRequest

    const requestTest4: IMIRequest = {

      program: 'OIS100MI',
      transaction: 'LstLine',
      record: {
        CUNO: this.cunoHeader$,
        ORNO: this.orno
      },
      outputFields: ['ITNO', 'CODT', 'ORNO', 'PONR','POSX', 'ORQA', 'ALUN', 'LNAM', 'ORST', 'RNQT'], //il manque CUNO et ORST
      // maxReturnedRecords: 50
    };


    this.apiWebService.callAPI(requestTest4).subscribe(
      data => {

        this.listDeliveredOrders = data.items;
        this.initGridDeliveredOrder();      // lance l'initialisation de la Grid

      },(error) => {                                                    // gestion d'erreur selon la méthode que l'on a déclaréer en dessous
        console.error('Erreur API :', error);
        this.handleError('Échec de l\'exécution de l\'API ', error);
      });
}

  private initGridDeliveredOrder(){
    const options: SohoDataGridOptions = {
      selectable: 'single' as SohoDataGridSelectable,
      disableRowDeactivation: true,
      clickToSelect: true,
      alternateRowShading: true,
      cellNavigation: false,
      idProperty: 'listDeliveredOrders',
      paging: false,
      pagesize: 15,
      indeterminate: false,

      columns: [
        {
          width: 50, id: 'selectionCheckbox', field: '', name: '', sortable: false,
          resizable: false, align: 'center', formatter: Soho.Formatters.SelectionCheckbox, hidden: true
        },
        {
          width: 'auto', id: 'col-adrt', field: '', name: 'Client',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-adid', field: 'ITNO', name: 'Code article',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'CODT', name: 'DtLvCf',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'ORNO', name: 'N°CDV',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cua1', field: 'PONR', name: 'Ligne',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-adid', field: 'POSX', name: 'sf',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'ORQA', name: 'Qté cdé UR',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cua1', field: 'ALUN', name: 'UnR',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'LNAM', name: 'Mnt dev loc',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'ORST', name: 'SHa',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'RNQT', name: 'Qté restante',
          resizable: true, filterType: 'text', sortable: true
        },
      ],
      dataset: this.listDeliveredOrders,
      emptyMessage: {
        title: 'Aucune commande bloqué à afficher',
        icon: 'icon-empty-no-data'
      }
    };
    this.datagridOptions2 = options;
  }

}
