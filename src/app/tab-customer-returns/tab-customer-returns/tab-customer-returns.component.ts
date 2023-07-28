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

  whlo: '110';
  repn:number= 100038;


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
    this.initGridCustomerReturns();
    console.log(this.cunoHeader$);
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
       WHLO: this.whlo,
       REPN: this.repn,
       CUNO: this.cunoHeader$
     },
     outputFields: ['RORC', 'ORNO', 'WHLO', 'REPN', 'EPDT'], // il manque les champs RESL RESH CRSB CRSH PYNO
     // maxReturnedRecords: 50
   };


   this.apiWebService.callAPI(requestTest4).subscribe(
     data => {
       this.listCustomerreturns = data;
           // lance l'initialisation de la Grid

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
         width: 'auto', id: 'col-chai', field: 'RORC', name: 'Cat',
         resizable: true, filterType: 'text', sortable: true
       },
       {
         width: 'auto', id: 'col-chct', field: 'ORNO', name: 'Ord.ref',//CUNO
         resizable: true, filterType: 'text', sortable: true
       },
       {
         width: 'auto', id: 'col-chl1', field: 'WHLO', name: 'Dép',
         resizable: true, filterType: 'text', sortable: true
       },
       {
         width: 'auto', id: 'col-chl1', field: 'REPN', name: 'N°récept',//RORN
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
