import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabOrdersRoutingModule } from '../Routes/tab-orders-routing.module';
import { TabOrdersComponent } from './tab-orders/tab-orders.component';




@NgModule({
   imports: [
      SharedModule,
      TabOrdersRoutingModule
   ],
   declarations: [TabOrdersComponent]
})
export class TabOrdersModule { }
