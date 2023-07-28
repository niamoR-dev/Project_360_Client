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
    console.log("début init grid api");
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
      idProperty: 'listBatchOrdersClient',
      paging: true,
      pagesize: 10,
      indeterminate: false,
      columns: [
        {
          width: 50, id: 'selectionCheckbox', field: '', name: '', sortable: false,
          resizable: false, align: 'center', formatter: Soho.Formatters.SelectionCheckbox, hidden: true
        },
        {
          width: 'auto', id: 'col-cuno', field: 'CUNO', name: 'Client',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-lmdt', field: 'LMDT', name: 'DtChg',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-faci', field: 'FACI', name: 'Eta',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-orno', field: 'ORNO', name: 'N° CDV tmp',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-ponr', field: 'PONR', name: 'Ligne',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-posx', field: 'POSX', name: 'sf',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-opt1', field: 'OPT1', name: 'Opt',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-stat', field: 'STAT', name: 'Stt',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-ornr', field: 'ORNR', name: 'N° CDV',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-rgdt', field: 'RGDT', name: 'DtSais',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-bqly', field: 'BQLY', name: 'Src',
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
    console.log("fin init grid api");
    console.log('RGDT');
  }

}
