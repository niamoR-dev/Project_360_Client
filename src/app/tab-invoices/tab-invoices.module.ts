import { NgModule } from '@angular/core';
import { TabInvoicesRoutingModule } from './tab-invoices-routing.module';
import { TabInvoicesComponent } from './tab-invoices/tab-invoices.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
   imports: [
      SharedModule,
      TabInvoicesRoutingModule
   ],
   declarations: [TabInvoicesComponent]
})
export class TabOrdersModule { }
