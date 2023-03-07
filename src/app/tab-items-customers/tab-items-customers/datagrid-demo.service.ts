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

    this.data.push({field1: 1475568, field2: 'test champ 1', field3: 'test'});


    /* eslint-enable */
  }

  onActionHandler(a: any) {
    console.warn(a.text());
  }
}
