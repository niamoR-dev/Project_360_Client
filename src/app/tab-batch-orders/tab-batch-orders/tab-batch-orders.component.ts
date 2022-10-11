import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { BatchOrdersWebService } from 'src/app/core/web-services/batch-orders.webservice';

@Component({
  selector: 'app-tab-batchOrders',
  templateUrl: './tab-batch-orders.component.html',
  styleUrls: ['./tab-batch-orders.component.css']
})
export class TabBatchOrdersComponent extends CoreBase implements OnInit {


  //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////
  datagridOptions: SohoDataGridOptions = {};
  cunoHeader$: any;
  cunoSubscription: Subscription;
  show: boolean; // permets l'affichage de détails au clique
  listBatchOrdersClient: any[]; // tableau pour enregistrer le retour d'API des adresses d'un client

  cuno: any;
  agno: any;
  prex: any;
  agdt: any;
  stdt: any;
  agtp: any;
  tx40: any;
  agst: any;
  agno2: any;


  //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


  constructor(private batchOrdersWebService: BatchOrdersWebService, private dataForTabHeaderService: DataForTabHeaderService) {
    super('TabBatchOrdersComponent');
  }

  //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////



  ngOnInit() {
    this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO

    this.sendCunoToAddressesWebService(); // lancement de la méthode de récupération du CUNO

    //this.recoveryDataFromAPI(); // lancement de la méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

  }



  //////////////////////////////////////////////////////////////////// Méthodes qui gère l'affichage Grid ///////////////////////////////////////////////////////////////////////////////////


  cunoHeaderMethod() {    // méthode observable pour récupérer la CUNO de la dropdown du header
    this.cunoSubscription = this.dataForTabHeaderService.cunoSubject.subscribe(
      (data: any) => {
        this.cunoHeader$ = data;
      }
    );
    this.dataForTabHeaderService.subjectMethod();
  }



  sendCunoToAddressesWebService() {       // méthode obesevable pour envoyer la CUNO de le webService de Adresse
    this.batchOrdersWebService.recoveryCunoFromHeader(this.cunoHeader$).subscribe();
  }



  // recoveryDataFromAPI() {             // méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

  //    this.batchOrdersWebService.listBatchOrders().subscribe(data => {
  //       this.listBatchOrdersClient = data;

  //       this.initGridBatchOrders();      // lance l'initialisation de la Grid
  //    });


  // }
  /*
     recoveryDataFromAPI() {             // méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

        this.batchOrdersWebService.listeBatchOrder().subscribe(data => {
           this.listBatchOrdersClient = data;

           this.initGridBatchOrder();      // lance l'initialisation de la Grid
        });
     }

     private initGridBatchOrder() {                             // méthode qui permet d'afficher les données dans la GRID
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
                 width: 'auto', id: 'col-adid', field: 'AGNO', name: 'Code ouverture',
                 resizable: true, filterType: 'text', sortable: true
              },
              {
                 width: 'auto', id: 'col-cunm', field: 'STDT', name: 'Date Debut',
                 resizable: true, filterType: 'text', sortable: true
              },
              {
                 width: 'auto', id: 'col-cua1', field: 'AGTP', name: 'type',
                 resizable: true, filterType: 'text', sortable: true
              },
              {
                 width: 'auto', id: 'col-cua1', field: 'TX40', name: 'Designation',
                 resizable: true, filterType: 'text', sortable: true
              },

           ],
           dataset: this.listBatchOrdersClient,
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

        this.InitDetailContractGetBasicData();

        this.cuno = selected.CUNO;
        this.agno = selected.AGNO;
        this.prex = selected.PREX;
        this.agdt = selected.AGDT;
        this.stdt = selected.STDT;
        this.agtp = selected.AGTP;
        this.tx40 = selected.TX40;

        this.agno2 = selected.AGNO;

        this.EnvoiAGNO(this.agno2 = selected.AGNO);
     }

     private InitDetailContractGetBasicData() { // API 610 GetBasicData

        this.contractsWebService.listContracts().subscribe(data => {
           this.detailsContractsGetBasicData = data;

           this.cuno = this.detailsContractsGetBasicData[0].CUNO;
           this.agno = this.detailsContractsGetBasicData[0].AGNO;
           this.prex = this.detailsContractsGetBasicData[0].PREX;
           this.agdt = this.detailsContractsGetBasicData[0].AGDT;
           this.stdt = this.detailsContractsGetBasicData[0].STDT;
           this.agtp = this.detailsContractsGetBasicData[0].AGTP;
           this.tx40 = this.detailsContractsGetBasicData[0].TX40;

           //  console.log(" GetBasicData  ", this.detailsAddressesGetBasicData)  // la virgule d ans le console log permets de lire à 'intérieur de l'objet

        });
     }
  */

}
