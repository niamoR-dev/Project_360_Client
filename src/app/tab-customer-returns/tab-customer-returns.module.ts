import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabCustomerReturnsComponent } from './tab-customer-returns/tab-customer-returns.component';
import { TabCustomerReturnsRoutingModule } from '../Routes/tab-customer-returns-routing.module';

@NgModule({
   imports: [
      SharedModule,
      TabCustomerReturnsRoutingModule
   ],
   declarations: [TabCustomerReturnsComponent]
})
export class TabCustomerReturnsModule { }
