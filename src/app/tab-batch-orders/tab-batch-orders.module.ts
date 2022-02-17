import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabBatchOrdersRoutingModule } from './tab-batch-orders-routing.module';
import { TabBatchOrdersComponent } from './tab-batch-orders/tab-batch-orders.component';


@NgModule({
   imports: [
      SharedModule,
      TabBatchOrdersRoutingModule
   ],
   declarations: [TabBatchOrdersComponent]
})
export class TabBatchOrdersModule { }
