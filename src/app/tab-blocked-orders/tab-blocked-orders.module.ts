import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabBlockedOrdersComponent } from './tab-blocked-orders/tab-blocked-orders.component';
import { TabBlockedOrdersRoutingModule } from '../Routes/tab-blocked-orders-routing.module';


@NgModule({
   imports: [
      SharedModule,
      TabBlockedOrdersRoutingModule
   ],
   declarations: [TabBlockedOrdersComponent]
})
export class TabBlockedOrdersModule { }
