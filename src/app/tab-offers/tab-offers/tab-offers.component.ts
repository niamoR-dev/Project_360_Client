import { Component, OnInit } from '@angular/core';
import { CoreBase, IMIRequest } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { APIWebService } from 'src/app/core/web-services/api.webservice';

@Component({
  selector: 'app-tab-offers',
  templateUrl: './tab-offers.component.html',
  styleUrls: ['./tab-offers.component.css']
})
export class TabOffersComponent extends CoreBase implements OnInit {


  //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////
  datagridOptions: SohoDataGridOptions = {};

  cuno: any;
  cono: any;
  adrt: any;
  adid: any;
  cunm: any;
  cua1: any;
  cua2: any;
  cua3: any;
  cua4: any;
  phno: any;
  tfno: any;
  meal: any;
  yref: any;
  ealo: any;
  modl: any;
  tedl: any;
  vrno: any;
  orsl: any;

  listOffersClient: any; // tableau pour enregistrer le retour d'API des adresses d'un client

  cunoHeader$: any;
  cunoSubscription: Subscription;



  //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


  constructor(private dataForTabHeaderService: DataForTabHeaderService, private apiWebService: APIWebService) {
    super('TabOffersComponent');
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
        this.getOffersIMIRequest();
      }
    );
  }

  private getOffersIMIRequest() { // mettre la IMIRequest

    const requestTest4: IMIRequest = {

      program: 'MDBREADMI',
      transaction: 'SelOOHEAD10',
      record: {
        CUNO: this.cunoHeader$,
        ORSL: '05'
      },
      outputFields: ['FACI', 'ORNO', 'ORTP', 'CUNO', 'CUOR', 'ORDT', 'ORSL', 'ORST', 'RESP', 'BRLA', 'NTLA'],
      // maxReturnedRecords: 50
    };


    this.apiWebService.callAPI(requestTest4).subscribe(
      data => {

        this.listOffersClient = data;
        this.initGridOffers();      // lance l'initialisation de la Grid

      });
  }


  private initGridOffers() {                             // méthode qui permet d'afficher les données dans la GRID
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
          width: 'auto', id: 'col-adrt', field: 'FACI', name: 'Client',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-adid', field: 'ORNO', name: 'Cde Ouv',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'ORTP', name: 'Dte dé',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cua1', field: '', name: 'N° Cde Client',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-adid', field: 'CUNO', name: 'Reste Net',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'CUOR', name: 'Dev',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cua1', field: 'ORDT', name: 'Stt_Lo',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'ORSL', name: 'Stt_Hi',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'ORST', name: 'Respons',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cua1', field: 'RESP', name: 'Total Net',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'BRLA', name: 'CTx',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'NTLA', name: 'CTx',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: '', name: 'Bloc.',
          resizable: true, filterType: 'text', sortable: true
        },
      ],
      dataset: this.listOffersClient,
      emptyMessage: {
        title: 'Aucune adresse à afficher',
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
