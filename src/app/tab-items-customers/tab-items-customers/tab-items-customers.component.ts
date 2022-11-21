import { Component, OnInit, ViewChild,  ChangeDetectionStrategy } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { ItemsCustomersWebService } from 'src/app/core/web-services/items-customers.webservice';
import { of, Observable, Subject } from 'rxjs';
import { SohoDataGridComponent, SohoPopupMenuComponent } from 'ids-enterprise-ng';
import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';
import { DataGridItemsCustomers } from './datagrid-demo.service';





@Component({
   selector: 'app-tab-items-customers',
   templateUrl: './tab-items-customers.component.html',
   styleUrls: ['./tab-items-customers.component.css'],
   providers: [DataGridItemsCustomers]
})
export class TabItemsCustomersComponent extends CoreBase implements OnInit {
  @ViewChild(SohoDataGridComponent, { static: true }) dataGrid?: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective, { static: true }) busyIndicator?: SohoBusyIndicatorDirective;
  @ViewChild(SohoPopupMenuComponent) popupMenu?: SohoPopupMenuComponent;

  private _subject$ = new Subject();
  public data = this._subject$.asObservable();
  public displayContextMenu = false;
  public contextMenuEvent: any;
  public contextMenuId = 'grid-context-menu';
  private menuItemsChoice = -1;
  public menuItems?: MenuItem[];


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




   constructor(private service: DataGridItemsCustomers, private miService: MIService, private userService: UserService, private itemsCustomersWebService: ItemsCustomersWebService) {
      super('TabItemsCustomersComponent');
   }

   ngOnInit() {
      this.itemsCustomersWebService.listeItemsCustomers().subscribe(data => {

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
               width: 'auto', id: 'col-cuno', field: 'ORCUNO', name: 'Code Client',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-itno', field: 'ORITNO', name: 'Code article',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-itds', field: 'ORITDS', name: 'Nom',
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

      this.itds = selected.ORITDS;
   }

   private InitDetailItemCustomerList() { // API OIS005MI

      this.itemsCustomersWebService.listDetailItemCustomer().subscribe(data => {
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


   //NEW



   ngAfterViewInit() {
    this.addRows();
  }

  public get columns(): Observable<SohoDataGridColumn[]> {
    return of(this.service.getColumns());
  }

  private addRows() {
    this.service.getData((null) as any).subscribe((d: any[]) => {
      this.busyIndicator?.open();
      const newData = new Array<any>(...d);
      newData.forEach((r) => r.orderDate = new Date());
      this._subject$.next(newData);
      this.busyIndicator?.close(true);
    });
  }

  addRow() {
    this.service.getData((null) as any).subscribe((d: any[]) => {
      const newData = new Array<any>(d[0]);
      newData.forEach((r) => r.orderDate = new Date());
      this.dataGrid?.addRow(newData[0], 'top');
    });
  }

  addFive() {
    this.service.getData((null) as any).subscribe((d: any[]) => {
      const newData = d.slice(0, 5);
      newData.forEach((r) => r.orderDate = new Date());
      this.dataGrid?.addRows(newData, 'top');
    });
  }

  busy() {
    if (this.busyIndicator) {
      (this.busyIndicator as any).activated = true;
      setTimeout(() => (this.busyIndicator as any).activated = false, 2000);
    }
  }

  toggleFilterRow() {
    this.dataGrid?.toggleFilterRow();
  }

  toggleSelectAll() {
    if (this.dataGrid) {
      this.dataGrid.showSelectAllCheckBox = this.dataGrid.showSelectAllCheckBox === undefined ? false : !this.dataGrid.showSelectAllCheckBox;
    }
  }

  resetFilter() {
    this.dataGrid?.clearFilter();
  }

  onSelected(e: SohoDataGridSelectedEvent) {
    console.log('onSelected()', e);
  }

  onRowDoubleClicked(e: SohoDataGridRowClicked) {
    console.log('onRowDoubleClicked()', e);
  }

  onRowClicked(e: SohoDataGridRowClicked) {
    console.log('onRowClicked()', e);
  }

  onContextMenu(e: SohoDataGridRowClicked) {
    this.dataGrid?.unSelectAllRows();
    this.dataGrid?.selectRows([e.row]);
    this.buildMenuOptions();
  }

  onContextMenuClose(e: any) {
    console.log('onContextMenuClose()', e);
  }

  onMenuItemSelected(e: any) {
    console.log('onMenuItemSelected()', e);
  }

  onBeforeContextMenuOpen(e: SohoPopupMenuEvent) {
    console.log('onBeforeContextMenuOpen()', e);
  }

  onContextMenuOpen(e: any) {
    console.log('onContextMenuOpen()', e);
  }

  onFilterOperatorChanged(e: any) {
    console.log('onFilterOperatorChanged()', e);
  }

  private buildMenuOptions() {
    if (this.menuItemsChoice === 2) {
      this.menuItemsChoice = -1;
    }

    this.menuItemsChoice++;
    this.menuItems = []; // reset menuItems array.

    switch (this.menuItemsChoice) {
      case 0:
        this.menuItems.push({ label: 'Setting One' });
        this.menuItems.push({ label: 'Setting Two' });
        this.menuItems.push({ label: 'Settings Three' });
        this.menuItems.push({ label: 'Setting Four' });
        this.menuItems.push({
          label: 'Setting Five',
          submenu: [
            { label: 'Sub Menu 1' },
            { label: 'Sub Menu 2' }
          ]
        });
        break;

      case 1:
        this.menuItems.push({ label: 'Option One' });
        this.menuItems.push({ label: 'Option Two' });
        this.menuItems.push({ label: 'Option Three' });
        this.menuItems.push({ label: 'Option Four' });
        this.menuItems.push({ label: 'Option Five' });
        this.menuItems.push({ label: 'Option Six' });
        this.menuItems.push({ label: 'Option Seven' });
        this.menuItems.push({ label: 'Option Eight' });
        this.menuItems.push({ label: 'Option Nine' });
        this.menuItems.push({ label: 'Option Ten' });
        break;

      case 2:
        this.menuItems.push({ label: 'Action One' });
        this.menuItems.push({ label: 'Action Two' });
        this.menuItems.push({ label: 'Action Three' });
        break;
    }
  }

  onBeforeOpen(_event: any) {
  }
  onClose(_event: any) {
  }
  onOpen(_event: any) {
  }
  onSelected2(event: any) {
    console.log('Selected item: ' + event);
  }
}

interface MenuItem {
  label: string;
  submenu?: MenuItem[];
}
