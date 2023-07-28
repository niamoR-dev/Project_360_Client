import { Component, OnInit } from '@angular/core';
import { CoreBase, IMIRequest } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { APIWebService } from 'src/app/core/web-services/api.webservice';


@Component({
   selector: 'app-tab-delivery',
   templateUrl: './tab-delivery.component.html',
   styleUrls: ['./tab-delivery.component.css']
})
export class TabDeliveryComponent extends CoreBase implements OnInit {

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
  agno: any;
  stdt: any;
  agtp: any;
  tx40: any;
  agst: any;

  show: boolean; // permets l'affichage de détails au clique

  listDelivery: any; // tableau pour enregistrer le retour d'API des adresses d'un client

  cunoHeader$: any;
  cunoSubscription: Subscription;



    //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


   constructor(private dataForTabHeaderService: DataForTabHeaderService, private apiWebService: APIWebService) {
      super('TabDeliveryComponent');
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
        this.getFreeIMIRequest();
      }
    );
  }

  private getFreeIMIRequest() { // mettre la IMIRequest

    const requestTest4: IMIRequest = {

      program: 'MDBREADMI',
      transaction: 'SelOCUSCH00',
      record: {
        CUNO: this.cunoHeader$
      },
      outputFields: ['CRID', 'CRTY', 'CRD0', 'CUCD', 'CRME', 'CRFA', 'VTCD', 'CRAM'],
      // maxReturnedRecords: 50
    };


    this.apiWebService.callAPI(requestTest4).subscribe(
      data => {

        this.listDelivery = data;
        this.initGridDelivery();      // lance l'initialisation de la Grid

      });
  }


  private initGridDelivery() {                             // méthode qui permet d'afficher les données dans la GRID
    const options: SohoDataGridOptions = {
      selectable: 'single' as SohoDataGridSelectable,
      disableRowDeactivation: true,
      clickToSelect: true,
      alternateRowShading: true,
      cellNavigation: false,
      idProperty: 'ListDelivery',
      paging: true,
      pagesize: 10,
      indeterminate: false,

      columns: [
        {
          width: 50, id: 'selectionCheckbox', field: '', name: '', sortable: false,
          resizable: false, align: 'center', formatter: Soho.Formatters.SelectionCheckbox, hidden: true
        },
        {
          width: 'auto', id: 'col-adrt', field: 'CRID', name: 'Frais',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-adid', field: 'CRTY', name: 'Frs',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'CRD0', name: 'Nom',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cua1', field: 'CUCD', name: 'Frais',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-adid', field: 'CRME', name: 'Dev',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'CRFA', name: 'Clc',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cua1', field: 'VTCD', name: 'Facteur calc',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'CRAM', name: 'CTx',
          resizable: true, filterType: 'text', sortable: true
        },
      ],
      dataset: this.listDelivery,
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

    this.cuno = selected.UYCUNO;
    this.agno = selected.UYAGNO;
    this.stdt = selected.UYSTDT;
    this.agtp = selected.UYAGTP;
    this.tx40 = selected.UYTX40;
    this.agtp = selected.UYAGST;


    this.getDetailsContractsIMIRequest();
  }

  private getDetailsContractsIMIRequest() {

    const requestDetailContracts: IMIRequest = {

      program: 'OIS060MI',
      transaction: 'LstCustBlkAgr',
      record: {
        CUNO: this.cunoHeader$,
      },
      outputFields: ['CUNO', 'AGNO', 'STDT', 'AGTP', 'TX40', 'AGST'],
      // maxReturnedRecords: 50
    };

    this.apiWebService.callAPI(requestDetailContracts).subscribe(data => {

      this.cuno = data[0].CUNO;
      this.agno = data[0].AGNO;
      this.stdt = data[0].STDT;
      this.agtp = data[0].AGTP;
      this.tx40 = data[0].TX40;
      this.agst = data[0].AGST;

    });

  }





  private ngOnDestroy() {               // obligatoire dans chaque onglet dès qu'on a une variable : Subscription, va fermer l'observable à la fermeture de l'onglet
    console.log("UNSUBSCRIBE Adresse")  // permets d'optimiser la gestion débit de données
    this.cunoSubscription.unsubscribe();
  }

}
