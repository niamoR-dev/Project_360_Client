import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { WhloHeaderService } from 'src/app/core/services/whlo-header-service/whlo-header.service';
import { CustomersReturnsWebService } from 'src/app/core/web-services/customers-returns.webservice';

@Component({
  selector: 'app-tab-customer-returns',
  templateUrl: './tab-customer-returns.component.html',
  styleUrls: ['./tab-customer-returns.component.css']
})
export class TabCustomerReturnsComponent extends CoreBase implements OnInit {


  //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

  datagridOptions: SohoDataGridOptions = {};
  cunoHeader$: any;
  whloHeader$: any;
  cunoSubscription: Subscription;
  whloSubscription: Subscription;
  listCommercialChannelClient: any[]; // tableau pour enregistrer le retour d'API des adresses d'un client

  cuno: any;
  itno: any;
  whlo: any;
  repn: any;
  reli: any;
  orno: any;

  listCustomerreturns: any[]; // tableau pour enregistrer le retour d'API
  detailsContractsGetBasicData: any[];


  //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


  constructor(private customersReturnsWebService: CustomersReturnsWebService, private dataForTabHeaderService: DataForTabHeaderService) {
    super('TabCustomerReturnsComponent');
  }

  //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////



  ngOnInit() {
    this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO
    this.whloHeaderMethod();
    this.sendCunoToCommercialChannelWebService(); // lancement de la méthode de récupération du CUNO
    this.sendWhloToCommercialChannelWebService();
    this.recoveryDataFromApi(); // lancement de la méthode de récupération des donnés qui lance aussi l'initialisation de la Grid
    // console.log("le cunoHeader$ ===>"+this.cunoHeader$);
    // console.log("le whloHeader$ ===>"+this.whloHeader$);
  }



  //////////////////////////////////////////////////////////////////// Méthodes qui gère l'affichage Grid ///////////////////////////////////////////////////////////////////////////////////



  cunoHeaderMethod() {    // méthode observable pour récupérer la CUNO de la dropdown du header
    this.cunoSubscription = this.dataForTabHeaderService.cunoSubject.subscribe(
      (data: any) => {
        this.cunoHeader$ = data;
      }
    );
  }

  whloHeaderMethod() {  // méthode observable pour récupérer le WHLO de la dropdown du header
    this.whloSubscription = this.dataForTabHeaderService.whloSubject.subscribe(
      (data: any) => {
        this.whloHeader$ = data;
        console.log("DATA ==>", data);
      }
    );
  }



  sendCunoToCommercialChannelWebService() {       // méthode obesevable pour envoyer la CUNO de le webService de Adresse
    this.customersReturnsWebService.recoveryCunoFromHeader(this.cunoHeader$).subscribe();
  }

  sendWhloToCommercialChannelWebService() {
    this.customersReturnsWebService.recoveryWhloFromHeader(this.whloHeader$).subscribe();
  }


  private recoveryDataFromApi() {
    this.customersReturnsWebService.listeCustomersReturned().subscribe(data => {
      console.log('ngoninit', data)
      this.listCustomerreturns = data;
      this.initGridContracts();
    });

  }


  private initGridContracts() {                             // méthode qui permet d'afficher les données dans la GRID
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
          width: 'auto', id: 'col-agno', field: 'ITNO', name: 'Cde Article',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-stdt', field: 'WHLO', name: 'Dép',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-agtp', field: 'REPN', name: 'N° Recept',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-tx40', field: 'RELI', name: 'Ligne',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-agst', field: 'ORNO', name: 'PONR',
          resizable: true, filterType: 'text', sortable: true
        },

      ],
      dataset: this.listCustomerreturns,
      emptyMessage: {
        title: 'Aucun article client à afficher',
        icon: 'icon-empty-no-data'
      }
    };
    this.datagridOptions = options;

  }

  onSelectedLine(args: any[]) {                                        // méthode pour gérer quand on cique sur une ligne

    const newCount = args.length;
    const selected = args && newCount === 1 ? args[0].data : null;

    this.InitDetailCustomerReturns();

    this.itno = selected.ITNO;
    this.whlo = selected.WHLO;
    this.repn = selected.REPN;
    this.reli = selected.RELI;
    this.orno = selected.ORNO;
  }




  private InitDetailCustomerReturns() { // API 610 GetBasicData
    this.customersReturnsWebService.listeCustomersReturned().subscribe(data => {
      this.detailsContractsGetBasicData = data;

      this.itno = this.detailsContractsGetBasicData[0].ITNO;
      this.whlo = this.detailsContractsGetBasicData[0].WHLO;
      this.repn = this.detailsContractsGetBasicData[0].REPN;
      this.reli = this.detailsContractsGetBasicData[0].RELI;
      this.orno = this.detailsContractsGetBasicData[0].ORNO;

      console.log(" GetBasicData  ===>", this.detailsContractsGetBasicData)  // la virgule d ans le console log permets de lire à 'intérieur de l'objet

    });
  }


}
