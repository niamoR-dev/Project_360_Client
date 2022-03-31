import { NgModule } from '@angular/core';
import { TabInvoicesRoutingModule } from './tab-invoices-customers-routing.module';
import { TabInvoicesComponent } from './tab-invoices-customers/tab-invoices-customers.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
   imports: [
      SharedModule,
      TabInvoicesRoutingModule
   ],
   declarations: [TabInvoicesComponent]
})
export class TabInvoicesModule { }
