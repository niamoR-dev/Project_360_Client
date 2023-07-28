import { Component, OnInit } from '@angular/core';
import { CoreBase, IMIRequest } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { APIWebService } from 'src/app/core/web-services/api.webservice';

@Component({
  selector: 'app-tab-contracts',
  templateUrl: './tab-contracts.component.html',
  styleUrls: ['./tab-contracts.component.css']
})
export class TabContractsComponent extends CoreBase implements OnInit {

  //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////
  datagridOptions: SohoDataGridOptions = {};

  varagno: any;

  cuno: any;
  agno: any;
  prex: any;
  agdt: any;
  stdt: any;
  agtp: any;
  tx40: any;
  agst: any;
  agno2: any;
  lidt: any;
  lvdt: any;
  obv1: any;

  show: boolean; // permets l'affichage de détails au clique

  listContractsClient: any; // tableau pour enregistrer le retour d'API des contrats d'un client

  detailsContractsGetBasicData: any;

  cunoHeader$: any;
  cunoSubscription: Subscription;



  //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////

  constructor(private dataForTabHeaderService: DataForTabHeaderService,  private apiWebService: APIWebService) {
    super('TabContractsComponent');
  }

  //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////

  ngOnInit() {                                                   // à l'ouverture de l'onglet, ce que l'on codde ici se lance

    this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO

  }

   //////////////////////////////////////////////////////////////////// Méthodes ngOnInit  ///////////////////////////////////////////////////////////////////////////////////

   private cunoHeaderMethod() {    // méthode observable pour récupérer la CUNO de la dropdown du header
    this.cunoSubscription = this.dataForTabHeaderService.cunoSubject.subscribe(
      (data: any) => {
        this.cunoHeader$ = data;
        this.getContractsIMIRequest();
      }
    );
  }


  private getContractsIMIRequest() { // mettre la IMIRequest

    const requestTest4: IMIRequest = {

      program: 'CMS100MI',
      transaction: 'Lst360CusContra',
      record: {
        UYCUNO: this.cunoHeader$
      },
      outputFields: ['UYCUNO', 'UYAGNO', 'UYSTDT', 'UYAGTP', 'UYTX40', 'UYAGST'],
      // maxReturnedRecords: 50
    };


    this.apiWebService.callAPI(requestTest4).subscribe(
      data => {

        this.listContractsClient = data;
        this.initGridContracts();      // lance l'initialisation de la Grid

      });
  }

  //////////////////////////////////////////////////////////////////// Méthodes qui gère l'affichage Grid ///////////////////////////////////////////////////////////////////////////////////


  private initGridContracts() { // méthode qui permet d'afficher les données dans la GRID
    const options: SohoDataGridOptions = {
      selectable: 'single' as SohoDataGridSelectable,
      disableRowDeactivation: true,
      clickToSelect: true,
      alternateRowShading: true,
      cellNavigation: false,
      idProperty: 'Lst360CusContra',
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
      dataset: this.listContractsClient,
      emptyMessage: {
        title: 'Aucun contrats client à afficher',
        icon: 'icon-empty-no-data'
      }
    };
    this.datagridOptions = options;
  }


  //////////////////////////////////////////////////////////////////// Méthodes qui gère le formulaire d'affichage Détail ///////////////////////////////////////////////////////////////////////////////////

  onSelectedLine(args: any[]) {                                        // méthode pour gérer quand on cique sur une ligne

    const newCount = args.length;
    const selected = args && newCount === 1 ? args[0].data : null;

    this.show = true;

    this.varagno = selected.UYAGNO

    this.cuno = selected.CUNO;
    this.agno = selected.AGNO;
    this.stdt = selected.STDT;
    this.lidt = selected.LIDT;
    this.prex = selected.PREX;

    this.getDetailsContractsIMIRequest();
  }

  private getDetailsContractsIMIRequest() {

    console.log('test1');
    console.log(this.varagno);
    console.log('test2');

    const requestDetailContracts: IMIRequest = {

      program: 'OIS060MI',
      transaction: 'LstCustBlkAgrLn',
      record: {
        CUNO: this.cunoHeader$,
        AGNO: this.varagno
      },
      outputFields: ['CUNO', 'AGNO', 'STDT', 'LIDT', 'PREX'],
    };

    this.apiWebService.callAPI(requestDetailContracts).subscribe(data => {

      this.cuno = data[0].CUNO;
      this.agno = data[0].AGNO;
      this.stdt = data[0].STDT;
      this.lidt = data[0].LIDT;
      this.prex = data[0].PREX;
    });

  }

  private ngOnDestroy() {               // obligatoire dans chaque onglet dès qu'on a une variable : Subscription, va fermer l'observable à la fermeture de l'onglet
    this.cunoSubscription.unsubscribe();
  }
}
