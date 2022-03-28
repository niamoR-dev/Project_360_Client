import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { CunoHeaderService } from 'src/app/core/services/cuno-header-service/cuno-header.service';
import { InvoicesWebService } from 'src/app/core/web-services/invoices.webservice';

@Component({
   selector: 'app-tab-invoices',
   templateUrl: './tab-invoices.component.html',
   styleUrls: ['./tab-invoices.component.css']
})
export class TabInvoicesComponent extends CoreBase implements OnInit {

   datagridOptions: SohoDataGridOptions = {};

   listInvoices: any[]; // tableau pour enregistrer le retour d'API des factures d'une commande

   idat: any;
   ivno: any;
   dudt: any;
   ivam: any;
   cucd: any;
   ralc: any;
   inst: any;


   listDetailInvoices: any[];

   cunoHeader: any;
   cunoSubscription: Subscription;

   constructor(private invoicesWebService: InvoicesWebService, private cunoHeaderService: CunoHeaderService) {
      super('TabInvoicesComponent');
   }

   ngOnInit(): void {
      this.cunoHeaderMethod();

      this.sendCunoToInvoicesWebService();

      this.recoveryDataFromAPI();

   }

   sendCunoToInvoicesWebService() {       // méthode obesevable pour envoyer la CUNO de le webService de Facture
      this.invoicesWebService.recoveryCunoFromHeader(this.cunoHeader).subscribe();
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

      this.invoicesWebService.listeInvoices().subscribe(data => {
         console.log("bfdbgfgdfgff", data)
         this.listInvoices = data;
         this.initGridInvoices();

      });

   }
   private initGridInvoices() {                             // méthode qui permet d'afficher les données dans la GRID
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
               width: 'auto', id: 'col-idat', field: 'UHIDAT', name: 'Date facture.',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-ivno', field: 'UHIVNO', name: 'Numéro facture',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-dudt', field: 'UHDUDT', name: 'Date échéance',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-ivam', field: 'UHIVAM', name: 'Montant Facture',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-cucd', field: 'UHCUCD', name: 'Devise',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-ralc', field: 'UHRALC', name: 'Restant à payer',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-inst', field: 'UHINST', name: 'Montant',
               resizable: true, filterType: 'text', sortable: true
            },


         ],
         dataset: this.listInvoices,
         emptyMessage: {
            title: 'Aucune facture à afficher',
            icon: 'icon-empty-no-data'
         }
      };
      this.datagridOptions = options;
   }
}
