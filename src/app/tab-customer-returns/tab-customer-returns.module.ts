import { NgModule } from '@angular/core';
import { TabCustomerReturnsRoutingModule } from './tab-commercial-channel-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TabCustomerReturnsComponent } from './tab-customer-returns/tab-customer-returns.component';

@NgModule({
   imports: [
      SharedModule,
      TabCustomerReturnsRoutingModule
   ],
   declarations: [TabCustomerReturnsComponent]
})
export class TabCommercialChannelModule { }
