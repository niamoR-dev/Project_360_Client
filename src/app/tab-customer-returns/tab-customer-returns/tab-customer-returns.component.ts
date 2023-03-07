import { Component, OnInit } from '@angular/core';
import { CoreBase, IMIRequest } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { APIWebService } from 'src/app/core/web-services/api.webservice';

@Component({
  selector: 'app-tab-customer-returns',
  templateUrl: './tab-customer-returns.component.html',
  styleUrls: ['./tab-customer-returns.component.css']
})
export class TabCustomerReturnsComponent extends CoreBase implements OnInit {

  //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////
  datagridOptions: SohoDataGridOptions = {};

  cuno: any;
  repn: any;
  rerc: any;
  rern: any;
  resl: any;
  resh: any;
  crsb: any;
  crsh: any;
  epdt: any;
  pyno: any;
  cunm: any;

  listCustomerreturns: any; // tableau pour enregistrer le retour d'API

  cunoHeader$: any;
  cunoSubscription: Subscription;



  //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////


  constructor(private dataForTabHeaderService: DataForTabHeaderService, private apiWebService: APIWebService) {
    super('TabCustomerReturnsComponent');
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
        this.getCommercialChannelIMIRequest();
      }
    );
  }


  private getCommercialChannelIMIRequest() { // mettre la IMIRequest

   const requestTest4: IMIRequest = {

     program: 'OIS390MI',
     transaction: 'LstOpenLine',
     record: {
       CUNO: this.cunoHeader$
     },
     outputFields: ['REPN', 'RORC', 'EPDT'],
     // maxReturnedRecords: 50
   };


   this.apiWebService.callAPI(requestTest4).subscribe(
     data => {

       this.listCustomerreturns = data;
       this.initGridCustomerReturns();      // lance l'initialisation de la Grid

     });
 }




  private initGridCustomerReturns() {                             // méthode qui permet d'afficher les données dans la GRID
   const options: SohoDataGridOptions = {
     selectable: 'single' as SohoDataGridSelectable,
     disableRowDeactivation: true,
     clickToSelect: true,
     alternateRowShading: true,
     cellNavigation: false,
     idProperty: 'LstOpenLine',
     paging: true,
     pagesize: 10,
     indeterminate: false,
     columns: [
       {
         width: 50, id: 'selectionCheckbox', field: '', name: '', sortable: false,
         resizable: false, align: 'center', formatter: Soho.Formatters.SelectionCheckbox, hidden: true
       },
       {
         width: 'auto', id: 'col-chai', field: 'REPN', name: 'Num recep',
         resizable: true, filterType: 'text', sortable: true
       },
       {
         width: 'auto', id: 'col-chct', field: '', name: 'Client',//CUNO
         resizable: true, filterType: 'text', sortable: true
       },
       {
         width: 'auto', id: 'col-chl1', field: 'RORC', name: 'Cat',
         resizable: true, filterType: 'text', sortable: true
       },
       {
         width: 'auto', id: 'col-chl1', field: '', name: 'Ord.ref',//RORN
         resizable: true, filterType: 'text', sortable: true
       },
       {
         width: 'auto', id: 'col-chl2', field: '', name: 'Bas',//RESL
         resizable: true, filterType: 'text', sortable: true
       },
       {
         width: 'auto', id: 'col-chl2', field: '', name: 'SHa',//RESH
         resizable: true, filterType: 'text', sortable: true
       },
       {
         width: 'auto', id: 'col-chl3', field: '', name: 'S+b',//CRSB
         resizable: true, filterType: 'text', sortable: true
       },
       {
         width: 'auto', id: 'col-chl3', field: '', name: 'S+h',//CRSH
         resizable: true, filterType: 'text', sortable: true
       },
       {
         width: 'auto', id: 'col-chl4', field: 'EPDT', name: 'DtR',
         resizable: true, filterType: 'text', sortable: true
       },
       {
         width: 'auto', id: 'col-cua1', field: '', name: 'Payeur',//PYNO
         resizable: true, filterType: 'text', sortable: true
       },
       {
         width: 'auto', id: 'col-cua1', field: '', name: 'Nom',//CUNM
         resizable: true, filterType: 'text', sortable: true
       },
     ],
     dataset: this.listCustomerreturns,
     emptyMessage: {
       title: 'Aucune retour client à afficher',
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
