import { Component, OnInit } from '@angular/core';
import { CoreBase, IMIRequest } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { APIWebService } from 'src/app/core/web-services/api.webservice';

@Component({
  selector: 'app-tab-commercial-channel',
  templateUrl: './tab-commercial-channel.component.html',
  styleUrls: ['./tab-commercial-channel.component.css']
})
export class TabCommercialChannelComponent extends CoreBase implements OnInit {


  //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////
  datagridOptions: SohoDataGridOptions = {};

  cuno: any;
  cono: any;
  chai: any;
  chct: any;
  chl1: any;
  chl2: any;
  chl3: any;
  chl4: any;


  phno: any;
  tfno: any;
  meal: any;
  yref: any;
  ealo: any;
  modl: any;
  tedl: any;
  vrno: any;

  listCommercialChannel: any; // tableau pour enregistrer le retour d'API des adresses d'un client

  cunoHeader$: any;
  cunoSubscription: Subscription;



  //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


  constructor(private dataForTabHeaderService: DataForTabHeaderService, private apiWebService: APIWebService) {
    super('TabCommercialChannelComponent');
  }

  //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////



  ngOnInit() {

    this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO

  }



    //////////////////////////////////////////////////////////////////// Méthodes ngOnInit  ///////////////////////////////////////////////////////////////////////////////////




    private cunoHeaderMethod() {    // méthode observable pour récupérer la CUNO de la dropdown du header
      this.cunoSubscription = this.dataForTabHeaderService.cunoSubject.subscribe(
        (data: any) => {
          this.cunoHeader$ = data;
          this.getCommercialChannel();
        }
      );
    }


    private getCommercialChannel() { // mettre la IMIRequest

      const requestTest4: IMIRequest = {

        program: 'OIS038MI',
        transaction: 'LstBusChainCust',
        record: {
          CONO: '100',
          CHAI: this.cunoHeader$
        },
        outputFields: ['SLVL','CHAI', 'CHMB', 'MBST'],
        // maxReturnedRecords: 50
      };


      this.apiWebService.callAPI(requestTest4).subscribe(
        data => {

          this.listCommercialChannel = data;
          this.initGridCommercialChannel();      // lance l'initialisation de la Grid

        });
    }



  //////////////////////////////////////////////////////////////////// Méthodes qui gère l'affichage Grid ///////////////////////////////////////////////////////////////////////////////////


  private initGridCommercialChannel() {                             // méthode qui permet d'afficher les données dans la GRID
    const options: SohoDataGridOptions = {
      selectable: 'single' as SohoDataGridSelectable,
      disableRowDeactivation: true,
      clickToSelect: true,
      alternateRowShading: true,
      cellNavigation: false,
      idProperty: 'LstBusChainStr',
      paging: true,
      pagesize: 10,
      indeterminate: false,
      columns: [
        {
          width: 50, id: 'selectionCheckbox', field: '', name: '', sortable: false,
          resizable: false, align: 'center', formatter: Soho.Formatters.SelectionCheckbox, hidden: true
        },
        {
          width: 'auto', id: 'col-slvl1', field: 'SLVL', name: 'Super-centrale',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-slvl2', field: 'SLVL', name: 'Centrale',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-slvl3', field: 'SLVL', name: 'Platforme',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-slvl4', field: 'SLVL', name: 'Magasin',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-chai', field: 'CHAI', name: 'Circ. comm',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: '', name: 'Nom',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-chmb', field: 'CHMB', name: 'N° membre',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-mbst', field: 'MBST', name: 'stt',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-chl1', field: '', name: 'Adresse',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-chl2', field: '', name: 'Adresse',
          resizable: true, filterType: 'text', sortable: true
        },
      ],
      dataset: this.listCommercialChannel,
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
