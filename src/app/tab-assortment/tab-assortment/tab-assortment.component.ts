import { Component, OnInit } from '@angular/core';
import { CoreBase, IMIRequest } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { APIWebService } from 'src/app/core/web-services/api.webservice';

@Component({
  selector: 'app-tab-assortment',
  templateUrl: './tab-assortment.component.html',
  styleUrls: ['./tab-assortment.component.css']
})
export class TabAssortmentComponent extends CoreBase implements OnInit {

  //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

  datagridOptions: SohoDataGridOptions = {};


  listAssortmentClient: any; // tableau pour enregistrer le retour d'API des adresses d'un client

  cunoHeader$: any;
  cunoSubscription: Subscription;



  //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


  constructor(private dataForTabHeaderService: DataForTabHeaderService, private apiWebService: APIWebService) {
    super('TabAssortmentComponent');
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
        this.getAssortmentIMIRequest();
      }
    );
  }

  private getAssortmentIMIRequest() { // mettre la IMIRequest

    const requestTest4: IMIRequest = {

      program: 'CRS105MI',
      transaction: 'LstAssmItem',
      record: {
        CONO: '100',
        ASCD: 'DIPLOM'
      },
      outputFields: ['ASCD','ITNO','FDAT','SEQN'],
      // maxReturnedRecords: 50
    };


    this.apiWebService.callAPI(requestTest4).subscribe(
      data => {

        this.listAssortmentClient = data;
        this.initGridAssortment();      // lance l'initialisation de la Grid

      });
  }

  private initGridAssortment() {                             // méthode qui permet d'afficher les données dans la GRID
    const options: SohoDataGridOptions = {
      selectable: 'single' as SohoDataGridSelectable,
      disableRowDeactivation: true,
      clickToSelect: true,
      alternateRowShading: true,
      cellNavigation: false,
      idProperty: 'LstAssmItem',
      paging: true,
      pagesize: 10,
      indeterminate: false,

      columns: [
        {
          width: 50, id: 'selectionCheckbox', field: '', name: '', sortable: false,
          resizable: false, align: 'center', formatter: Soho.Formatters.SelectionCheckbox, hidden: true
        },
        {
          width: 'auto', id: 'col-ascd', field: 'ASCD', name: 'Assort',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-itno', field: 'ITNO', name: 'Code article',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-fdat', field: 'FDAT', name: 'Dt déb',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cua1', field: '', name: 'Désignation',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-seqn', field: 'SEQN', name: 'N°séq',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: '', name: 'Désignation',
          resizable: true, filterType: 'text', sortable: true
        },
      ],
      dataset: this.listAssortmentClient,
      emptyMessage: {
        title: 'Aucun Assortiment à afficher',
        icon: 'icon-empty-no-data'
      }
    };
    this.datagridOptions = options;
  }

}
