import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabBatchOrdersComponent } from './tab-batch-orders/tab-batch-orders.component';
import { TabBatchOrdersRoutingModule } from '../Routes/tab-batch-orders-routing.module';


@NgModule({
   imports: [
      SharedModule,
      TabBatchOrdersRoutingModule
   ],
   declarations: [TabBatchOrdersComponent]
})
export class TabBatchOrdersModule { }
