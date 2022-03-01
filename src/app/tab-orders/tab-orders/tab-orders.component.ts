import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { OrdersService } from 'src/app/core/web-services/orders.webservice';

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
   modl: any;
   agnt: any;
   cuor: any;

   listDetailOrders: any[];


   constructor(private miService: MIService, private userService: UserService, private orderService: OrdersService) {
      super('TabOrdersComponent');
   }

   ngOnInit() {

      this.orderService.listeOrders().subscribe(data => {

         this.listOrders = data;
         this.initGridOrders();

      });

   }

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
               width: 'auto', id: 'col-itds', field: '', name: 'Ligne', // à revoir
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
               width: 'auto', id: 'col-itds', field: '', name: 'Cd.Paiement', // a voir
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-modl', field: 'MODL', name: 'Méth. Liv.',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-itds', field: '', name: 'Cdt Liv.', // à voir
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-itds', field: '', name: 'Bloc.', // à voir
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-ortp', field: '', name: 'Type CDV', // à voir
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-agnt', field: 'AGNT', name: 'Représent',
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
