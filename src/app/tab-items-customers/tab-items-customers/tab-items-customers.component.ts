import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { ItemsCustomersService } from 'src/app/core/web-services/items-customers.service';

@Component({
   selector: 'app-tab-items-customers',
   templateUrl: './tab-items-customers.component.html',
   styleUrls: ['./tab-items-customers.component.css']
})
export class TabItemsCustomersComponent extends CoreBase implements OnInit {


   datagridOptions: SohoDataGridOptions = {};

   listItemCustomer: any[]; // tableau pour enregistrer le retour d'API des articles du client

   popn: any;
   itds: any;
   alum: any;
   d2qt: any;
   d3qt: any;
   resp: any;
   adcu: any;

   listDetailItemCustomer: any[];




   constructor(private miService: MIService, private userService: UserService, private itemsCustomersService: ItemsCustomersService) {
      super('TabItemsCustomersComponent');
   }

   ngOnInit() {
      this.itemsCustomersService.listeItemsCustomers().subscribe(data => {

         this.listItemCustomer = data;
         this.initGridItemCustomer();

      });

   }

   private initGridItemCustomer() {                             // méthode qui permet d'afficher les données dans la GRID
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
               width: 'auto', id: 'col-cuno', field: 'CUNO', name: 'Client',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-itno', field: 'ITNO', name: 'Code article',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-itds', field: 'ITDS', name: 'Nom',
               resizable: true, filterType: 'text', sortable: true
            },

         ],
         dataset: this.listItemCustomer,
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
      this.InitDetailItemCustomerList();
      //this.show = true;

      this.itds = selected.ITDS;
   }

   private InitDetailItemCustomerList() { // API OIS005MI

      this.itemsCustomersService.listDetailItemCustomer().subscribe(data => {
         this.listDetailItemCustomer = data;

         this.popn = this.listDetailItemCustomer[0].POPN;
         this.alum = this.listDetailItemCustomer[0].ALUM;
         this.d2qt = this.listDetailItemCustomer[0].D2QT;
         this.d3qt = this.listDetailItemCustomer[0].D3QT;
         this.resp = this.listDetailItemCustomer[0].RESP;
         this.adcu = this.listDetailItemCustomer[0].ADCU;

         console.log(" GetBasicData  ", this.listDetailItemCustomer)  // la virgule dans le console log permets de lire à 'intérieur de l'objet

      });
   }


}
