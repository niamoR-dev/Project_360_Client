import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabBlockedOrdersRoutingModule } from './tab-blocked-orders-routing.module';
import { TabBlockedOrdersComponent } from './tab-blocked-orders/tab-blocked-orders.component';


@NgModule({
   imports: [
      SharedModule,
      TabBlockedOrdersRoutingModule
   ],
   declarations: [TabBlockedOrdersComponent]
})
export class TabBlockedOrdersModule { }
