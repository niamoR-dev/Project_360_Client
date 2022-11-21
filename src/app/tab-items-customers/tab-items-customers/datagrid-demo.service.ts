import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// @ts-ignore
import { SohoDataGridService } from 'ids-enterprise-ng';

@Injectable()
export class DataGridItemsCustomers extends SohoDataGridService {

  private columns: Array<SohoDataGridColumn> = Array<SohoDataGridColumn>();
  public data: Array<any> = Array<any>();

  public addColumn(column: SohoDataGridColumn) {
    this.getColumns().unshift(column);
  }

  getColumns(): Array<SohoDataGridColumn> {
    if (this.columns.length === 0) {
      this.init();
    }
    return this.columns;
  }

  getData(_req: SohoDataGridSourceRequest): Observable<Array<any>> {
    return of(this.data).pipe(delay(500));
  }

  constructor() {
    super();
  }

  init() {
    /* eslint-disable */


    // this.columns.push({
    //   id: 'selectionCheckbox',
    //   sortable: false,
    //   resizable: false,
    //   width: 50,
    //   formatter: Soho.Formatters.SelectionCheckbox,
    //   align: 'center'
    // });

    // this.columns.push({
    //   id: 'drilldown',
    //   hidden: true,
    //   name: 'Drill In',
    //   field: '',
    //   formatter: Soho.Formatters.Drilldown,
    //   cssClass: 'l-center-text',
    //   click: (_e: any, args: any) => { console.log('fhdhfuodshfjhdsjlfhdjshfjldshj', args); },
    //   reorderable: false
    // });

    // this.columns.push(
    //   {
    //     id: 'productId',
    //     hidden: true,
    //     name: 'Product Id',
    //     field: 'productId',
    //     formatter: Soho.Formatters.Readonly
    //   });

    this.columns.push({
      id: 'field1',
      filterType: 'text',
      name: 'Code client',
      sortable: false,
      field: 'field1',
      formatter: Soho.Formatters.Text,
    });

    this.columns.push({
      id: 'field2',
      filterType: 'text',
      name: 'Code article',
      sortable: false,
      hideable: false,
      field: 'field2',
      formatter: Soho.Formatters.Text,
      /*template: '<p class="datagrid-row-heading">{{productId}}</p><p class="datagrid-row-subheading">{{productName}}</p>',*/
      click: (_e: any, args: any) => { console.log('link was clicked', args); },
      textOverflow: 'ellipsis'
    });

    this.columns.push({
      id: 'field3',
      name: 'Nom',
      sortable: false,
      field: 'field3',
      formatter: Soho.Formatters.Text,
    });

    // this.columns.push({
    //   id: 'activity',
    //   name: 'Activity',
    //   filterType: 'text',
    //   field: 'activity',
    //   textOverflow: 'ellipsis'
    // });

    // this.columns.push({
    //   id: 'quantity',
    //   name: 'Quantity',
    //   filterType: 'text',
    //   field: 'quantity',
    //   filterConditions: ['equals', 'contains']
    // });

    // this.columns.push({
    //   id: 'password',
    //   hidden: true,
    //   name: 'Password',
    //   field: 'password',
    //   formatter: Soho.Formatters.Password,
    //   inputType: 'password'
    // });

    // this.columns.push({
    //   id: 'price1',
    //   name: 'Actual long Price',
    //   filterType: 'decimal',
    //   field: 'price',
    //   formatter: Soho.Formatters.Decimal
    // });

    // this.columns.push({
    //   id: 'price2', hidden: true, name: 'Actual long Price', align: 'right', field: 'price', formatter: Soho.Formatters.Decimal
    // });

    // this.columns.push({
    //   id: 'price2', hidden: true, name: 'Price', field: 'price', formatter: Soho.Formatters.Integer
    // });

    // this.columns.push({
    //   id: 'price4',
    //   hidden: true,
    //   name: 'Price - special formatted',
    //   filterType: 'decimal',
    //   field: 'price',
    //   formatter: Soho.Formatters.Decimal,
    //   numberFormat: { minimumFractionDigits: 0, maximumFractionDigits: 6 }
    // });

    // this.columns.push({
    //   id: 'orderDate',
    //   width: 300,
    //   name: 'Order Date',
    //   filterType: 'date',
    //   field: 'orderDate',
    //   formatter: Soho.Formatters.Date,
    //   dateFormat: Soho.Locale.calendar().dateFormat.datetime // @todo
    // });

    // this.columns.push({
    //   id: 'status',
    //   name: 'Status',
    //   filterType: 'select',
    //   options: [{ value: "ok", label: "OKAY" }, { value: "OK", label: "BIG OKAY" }, { value: "error", label: "ERROR" }, { value: "success", label: "SUCCESS" }],
    //   field: 'status',
    //   formatter: Soho.Formatters.Dropdown
    // });

    // this.columns.push(
    //   {
    //     id: 'status', name: 'Status', headerTooltip: 'Status', sortable: true, field: 'status',
    //     formatter: Soho.Formatters.Alert,
    //     options: [
    //       { value: "En file d\'attente", label: "En file d\'attente" },
    //       { value: 'ExtractionStatus_InProgress', label: 'ExtractionStatus_InProgress' },
    //       { value: 'Completed', label: 'Completed' },
    //       { value: 'Failed', label: 'Failed' },
    //       { value: 'TaskManager_Stopped', label: 'TaskManager_Stopped' },
    //       { value: 'CompletedWithErrors', label: 'CompletedWithErrors' },
    //       { value: 'Stopping', label: 'Stopping' },
    //     ],
    //     filterConditions: ['contains', 'equals'],
    //     filterType: 'select', width: '12%', textOverflow: 'ellipsis',
    //     ranges: [{ 'value': 'Completed', 'classes': 'success', text: 'Completed' },
    //     { 'value': 'Failed', 'classes': 'error', text: 'Failed' },
    //     { 'value': 'ExtractionStatus_InProgress', 'classes': 'in-progress', text: 'ExtractionStatus_InProgress' },
    //     { 'value': "En file d\'attente", 'classes': 'pending', text: "En file d\'attente" },
    //     { 'value': 'TaskManager_Stopped', 'classes': 'stop', text: 'TaskManager_Stopped' },
    //     { 'value': 'CompletedWithErrors', 'classes': 'error', text: 'CompletedWithErrors' },
    //     { 'value': 'Stopping', 'classes': 'error', text: 'Stopping' },]
    //   })

    // this.columns.push(
    //   {
    //     id: 'alert',
    //     hidden: true,
    //     name: 'Alert',
    //     field: 'quantity',
    //     formatter: Soho.Formatters.Alert,
    //     ranges: [{ 'min': 0, 'max': 8, 'classes': 'info', 'text': ' ' }, { 'min': 9, 'max': 1000, 'classes': 'error', 'text': 'value' }]
    //   });

    // this.columns.push({ id: 'ordered', hidden: true, name: 'Ordered', field: 'ordered', formatter: Soho.Formatters.Checkbox });


    // this.columns.push({
    //   id: '', hidden: false, name: 'Actions', field: '',
    //   formatter: Soho.Formatters.Actions, menuId: 'grid-actions-menu', selected: (_e: any, a: any) => { this.onActionHandler(a); }
    // });


    // this.columns.push({ id: 'nested', hidden: true, name: 'Nested Prop', field: 'setting.optionOne', formatter: Soho.Formatters.Text });
    // this.columns.push({ id: 'comment', hidden: true, name: 'Comment', field: 'comment', formatter: Soho.Formatters.Textarea, width: 100 });

    // this.data.push({ id: 1, field1: 2142201, field2: 'Compressor', activity: 'Assemble Paint', quantity: 1, price: 210.99, status: "En file d\'attente", orderDate: new Date(2014, 12, 8), action: 'Action', ordered: 1, setting: { optionOne: 'One', optionTwo: 'One' } });
    // this.data.push({ id: 2, field1: 2241202, field2: 'Different Compressor', activity: 'Inspect and Repair', quantity: 2, price: 210.99, status: 'CompletedWithErrors', orderDate: new Date(2015, 7, 3), action: 'On Hold', ordered: true, setting: { optionOne: 'One', optionTwo: 'One' } });
    // this.data.push({ id: 3, field1: 2342203, field2: 'Compressor', activity: 'Inspect and Repair', quantity: 1, price: 120.99, status: 'CompletedWithErrors', orderDate: new Date(2014, 6, 3), action: 'Action', ordered: true, comment: 'Dynamic harness out-of-the-box /n syndicate models deliver. Disintermediate, technologies /n scale deploy social streamline, methodologies, killer podcasts innovate. Platforms A-list disintermediate, value visualize dot-com /n tagclouds platforms incentivize interactive vortals disintermediate networking, webservices envisioneer; tag share value-added, disintermediate, revolutionary.' });
    // this.data.push({ id: 4, field1: 2445204, field2: 'Another Compressor', activity: 'Assemble Paint', quantity: 9, price: 210.99, status: 'error', orderDate: new Date(2015, 3, 3), action: 'Action', ordered: true });
    // this.data.push({ id: 5, field1: 2542205, field2: 'I Love Compressors', activity: 'Inspect and Repair', quantity: 4, price: 18.00, status: "En file d\'attente", orderDate: new Date(2015, 5, 5), action: 'On Hold', ordered: false });
    // this.data.push({ id: 5, field1: 2642205, field2: 'Air Compressors', activity: 'Inspect and Repair', quantity: 18, price: 9, status: 'Completed', orderDate: new Date(2014, 6, 9), action: 'On Hold', comment: 'B2C ubiquitous communities maximize B2C synergies extend dynamic revolutionize, world-class robust peer-to-peer. Action-items semantic technologies clicks-and-mortar iterate min' });
    // this.data.push({ id: 6, field1: 2642206, field2: 'Some Compressor', activity: 'inspect and Repair', quantity: 41, price: 123.99, status: 'Completed', orderDate: new Date(2014, 6, 9), action: 'On Hold', ordered: 0 });
    // this.data.push({ id: 7, field1: 2642206, field2: 'Some Compressor', activity: 'inspect and Repair', quantity: 41, price: '100.99', status: "En file d\'attente", orderDate: new Date(2014, 6, 9, 12, 12, 12), action: 'On Hold', ordered: 0 });


    this.data.push({field1: 1475568, field2: 'test champ 1', field3: 'test'});


    /* eslint-enable */
  }

  onActionHandler(a: any) {
    console.warn(a.text());
  }
}
