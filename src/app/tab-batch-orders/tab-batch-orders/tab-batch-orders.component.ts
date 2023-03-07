import { Component, OnInit } from '@angular/core';
import { CoreBase, IMIRequest } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { APIWebService } from 'src/app/core/web-services/api.webservice';

@Component({
  selector: 'app-tab-batchOrders',
  templateUrl: './tab-batch-orders.component.html',
  styleUrls: ['./tab-batch-orders.component.css']
})
export class TabBatchOrdersComponent extends CoreBase implements OnInit {

  //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////
  datagridOptions: SohoDataGridOptions = {};

  cuno: any;
  agno: any;
  prex: any;
  agdt: any;
  stdt: any;
  agtp: any;
  tx40: any;
  agst: any;
  agno2: any;

  listBatchOrdersClient: any; // tableau pour enregistrer le retour d'API des adresses d'un client

  cunoHeader$: any;
  cunoSubscription: Subscription;



  //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


  constructor(private dataForTabHeaderService: DataForTabHeaderService, private apiWebService: APIWebService) {
    super('TabBatchOrdersComponent');
  }

  //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////



  ngOnInit() {

    this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO

  }



  //////////////////////////////////////////////////////////////////// Méthodes qui gère l'affichage Grid ///////////////////////////////////////////////////////////////////////////////////


  private cunoHeaderMethod() {    // méthode observable pour récupérer la CUNO de la dropdown du header
    this.cunoSubscription = this.dataForTabHeaderService.cunoSubject.subscribe(
      (data: any) => {
        this.cunoHeader$ = data;
        this.getBatchOrdersIMIRequest();
      }
    );
  }

  private getBatchOrdersIMIRequest() { // mettre la IMIRequest

    const requestTest4: IMIRequest = {

      program: 'MDBREADMI',
      transaction: 'SelOCUSCH00',
      record: {
        CUNO: this.cunoHeader$
      },
      outputFields: ['CUNO', 'LMDT', 'FACI', 'ORNO', 'PONR', 'POSX', 'OPT1', 'STAT','ORNR', 'RGDT', 'BQLY'],
      // maxReturnedRecords: 50
    };


    this.apiWebService.callAPI(requestTest4).subscribe(
      data => {

        this.listBatchOrdersClient = data;
        this.initGridBatchOrders();      // lance l'initialisation de la Grid

      });
  }


  private initGridBatchOrders() {                             // méthode qui permet d'afficher les données dans la GRID
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
          width: 'auto', id: 'col-adid', field: 'LMDT', name: 'DtChg',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'FACI', name: 'Eta',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cua1', field: 'ORNO', name: 'N° CDV tmp',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-adid', field: 'PONR', name: 'Ligne',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'POSX', name: 'sf',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cua1', field: 'OPT1', name: 'Opt',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'STAT', name: 'Stt',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'ORNR', name: 'N° CDV',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'RGDT', name: 'DtSais',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'BQLY', name: 'Src',
          resizable: true, filterType: 'text', sortable: true
        },
      ],
      dataset: this.listBatchOrdersClient,
      emptyMessage: {
        title: 'Aucune commande Batch Order Head à afficher',
        icon: 'icon-empty-no-data'
      }
    };
    this.datagridOptions = options;
  }

  private ngOnDestroy() {               // obligatoire dans chaque onglet dès qu'on a une variable : Subscription, va fermer l'observable à la fermeture de l'onglet
    console.log("UNSUBSCRIBE Adresse")  // permets d'optimiser la gestion débit de données
    this.cunoSubscription.unsubscribe();
  }
}
