import { NgModule } from '@angular/core';

import { TabInvoicesComponent } from './tab-invoices-customers/tab-invoices-customers.component';
import { SharedModule } from '../shared/shared.module';
import { TabInvoicesRoutingModule } from '../Routes/tab-invoices-customers-routing.module';


@NgModule({
   imports: [
      SharedModule,
      TabInvoicesRoutingModule
   ],
   declarations: [TabInvoicesComponent]
})
export class TabInvoicesModule { }
