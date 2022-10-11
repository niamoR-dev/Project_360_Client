import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { OrdersWebService } from 'src/app/core/web-services/orders.webservice';

@Component({
  selector: 'app-tab-orders',
  templateUrl: './tab-orders.component.html',
  styleUrls: ['./tab-orders.component.css']
})
export class TabOrdersComponent extends CoreBase implements OnInit {

  datagridOptions: SohoDataGridOptions = {};

  listOrders: any[]; // tableau pour enregistrer le retour d'API des articles du client

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

  listDetailOrders: any[];

  cunoHeader: any;
  cunoSubscription: Subscription;


  constructor(private orderWebService: OrdersWebService, private dataForTabHeaderService: DataForTabHeaderService) {
    super('TabOrdersComponent');
  }

  ngOnInit() {

    this.cunoHeaderMethod();

    this.sendCunoToOrderWebService();

    this.recoveryDataFromAPI();

  }

  //////////////////////////////////////////////////////////////////// Méthodes ngOnInit  ///////////////////////////////////////////////////////////////////////////////////


  sendCunoToOrderWebService() {       // méthode obesevable pour envoyer la CUNO de le webService de Adresse
    this.orderWebService.recoveryCunoFromHeader(this.cunoHeader).subscribe();
  }


  cunoHeaderMethod() {    // méthode obesevable pour récupérer la CUNO de la dropdown du header
    this.cunoSubscription = this.dataForTabHeaderService.cunoSubject.subscribe(
      (data: any) => {
        this.cunoHeader = data;
      }
    );
    this.dataForTabHeaderService.subjectMethod();
  }


  recoveryDataFromAPI() {             // méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

    this.orderWebService.listeOrders().subscribe(data => {


      this.listOrders = data;
      this.initGridOrders();

    });

  }

  //////////////////////////////////////////////////////////////////// Méthodes qui gère l'affichage Grid ///////////////////////////////////////////////////////////////////////////////////



  private initGridOrders() {                             // méthode qui permet d'afficher les données dans la GRID
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
          width: 'auto', id: 'col-rldt', field: 'OARLDT', name: 'Dt Liv.',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-orno', field: 'OAORNO', name: 'No Cde',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-ordt', field: 'OAORDT', name: 'Dt Cde',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-itds', field: '', name: 'Ligne', // à revoir lien vers un autre onglets ?
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-orsl', field: 'OAORSL', name: 'Stt B',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-orst', field: 'OAORST', name: 'Stt H',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-itds', field: '', name: 'Montant', // à revoir
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cucd', field: 'OACUCD', name: 'Devise',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-tepy', field: 'OATEPY', name: 'Cd.Paiement',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-modl', field: 'OAMODL', name: 'Méth. Liv.',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-tedl', field: 'OATEDL', name: 'Cdt Liv.',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-oaoblc', field: 'OAOBLC', name: 'Bloc.',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-ortp', field: 'ORTP', name: 'Type CDV',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-smcd', field: 'OASMCD', name: 'Représent',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cuor', field: 'OACUOR', name: 'No Cde Client ',
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





}
