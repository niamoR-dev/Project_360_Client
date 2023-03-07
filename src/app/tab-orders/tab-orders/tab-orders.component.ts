import { Component, OnInit } from '@angular/core';
import { CoreBase, IMIRequest } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { APIWebService } from 'src/app/core/web-services/api.webservice';


@Component({
  selector: 'app-tab-orders',
  templateUrl: './tab-orders.component.html',
  styleUrls: ['./tab-orders.component.css']
})
export class TabOrdersComponent extends CoreBase implements OnInit {

//////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

  datagridOptions: SohoDataGridOptions = {};

// ici on déclare les champs qui sont utilisées dans la grid template
  rldt: any;
  orno: any;
  ordt: any;
  orsl: any;
  orst: any;
  cucd: any;
  tepy: any;
  modl: any;
  tedl: any;
  oblc: any;
  ortp: any;
  smcd: any;
  cuor: any;

  show: boolean; // permets l'affichage de détails au clique, doit faire une fonction ou un bouton SI pour enlever l'affichage

  listHeadOrders: any; // tableau pour enregistrer le retour d'API des Head d'une commande

  listOrdersDetails: any; // tableau pour enregistrer le retour d'API des Lignes du Commande Head

  cunoHeader$: any;
  cunoSubscription: Subscription;



//////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////

  constructor(private dataForTabHeaderService: DataForTabHeaderService, private apiWebService: APIWebService) {
    super('TabOrdersComponent');
  }

  ngOnInit() { // à l'ouverture de l'onglet, ce que l'on codde ici se lance

    this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO

  }

//////////////////////////////////////////////////////////////////// Méthodes ngOnInit  ///////////////////////////////////////////////////////////////////////////////////



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
      CONO: '100',
      CUNO: this.cunoHeader$,
      ORSL: '10'
      //ORST: '44'
    },
    outputFields: ['FACI', 'ORNO', 'ORTP', 'CUOR', 'ORDT', 'ORSL', 'ORST',],
    // maxReturnedRecords: 50
  };


  this.apiWebService.callAPI(requestTest4).subscribe(
    data => {

      this.listHeadOrders = data;
      this.initGridHeadOrder();      // lance l'initialisation de la Grid

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
      dataset: this.listHeadOrders,
      emptyMessage: {
        title: 'Aucune commande à afficher',
        icon: 'icon-empty-no-data'
      }
    };
    this.datagridOptions = options;
  }





}
