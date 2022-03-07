import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { CunoHeaderService } from 'src/app/core/services/cuno-header-service/cuno-header.service';
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


   constructor(private orderWebService: OrdersWebService, private cunoHeaderService: CunoHeaderService) {
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
      this.cunoSubscription = this.cunoHeaderService.cunoSubject.subscribe(
         (data: any) => {
            this.cunoHeader = data;
         }
      );
      this.cunoHeaderService.subjectMethod();
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
               width: 'auto', id: 'col-rldt', field: 'RLDT', name: 'Dt Liv.',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-orno', field: 'ORNO', name: 'No Cde',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-ordt', field: 'ORDT', name: 'Dt Cde',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-itds', field: '', name: 'Ligne', // à revoir lien vers un autre onglets ?
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-orsl', field: 'ORSL', name: 'Stt B',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-orst', field: 'ORST', name: 'Stt H',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-itds', field: '', name: 'Montant', // à revoir
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-cucd', field: 'CUCD', name: 'Devise',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-tepy', field: 'TEPY', name: 'Cd.Paiement',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-modl', field: 'MODL', name: 'Méth. Liv.',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-tedl', field: 'TEDL', name: 'Cdt Liv.',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-oaoblc', field: 'OBLC', name: 'Bloc.',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-ortp', field: 'ORTP', name: 'Type CDV',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-smcd', field: 'SMCD', name: 'Représent',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-cuor', field: 'CUOR', name: 'No Cde Client ',
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
