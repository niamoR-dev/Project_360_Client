import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { InvoicesWebService } from 'src/app/core/web-services/invoices-customers.webservice';

@Component({
  selector: 'app-tab-invoices',
  templateUrl: './tab-invoices-customers.component.html',
  styleUrls: ['./tab-invoices-customers.component.css']
})
export class TabInvoicesComponent extends CoreBase implements OnInit {

  datagridOptions: SohoDataGridOptions = {};

  listInvoices: any[]; // tableau pour enregistrer le retour d'API des factures d'une commande

  pyno: any;
  exin: any;
  vono: any;
  ivla: any;
  dudt: any;
  //??? = fac cor existe
  rivn: any;
  yea4: any;
  inpx: any;
  ivno: any;
  ivtp: any;


  listDetailInvoices: any[];

  cunoHeader: any;
  cunoSubscription: Subscription;

  constructor(private invoicesWebService: InvoicesWebService, private dataForTabHeaderService: DataForTabHeaderService) {
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
    this.cunoSubscription = this.dataForTabHeaderService.cunoSubject.subscribe(
      (data: any) => {
        this.cunoHeader = data;
      }
    );
    this.dataForTabHeaderService.subjectMethod();
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
          width: 'auto', id: 'col-pyno', field: 'UHPYNO', name: 'Payeur',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-exin', field: 'UHEXIN', name: 'N° fact étendue',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-vono', field: 'UHVONO', name: 'N° justi',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-ivla', field: 'UHIVLA', name: 'Mnt Facture',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-dudt', field: 'UHDUDT', name: 'DtEch',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-ralc', field: 'UHRALC', name: 'Incorrect',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-rivn', field: 'UHRIVN', name: 'Facture orig',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-yea4', field: 'UHYEA4', name: 'Ann',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-inpx', field: 'UHINPX', name: 'Factur',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-ivno', field: 'UHIVNO', name: 'N° fact',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-ivtp', field: 'UHIVTP', name: 'TypFc',
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
