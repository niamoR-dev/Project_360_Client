import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabOrdersDeliveredRoutingModule } from './tab-orders-delivered-routing.module';
import { TabOrdersDeliveredComponent } from './tab-orders-delivered/tab-orders-delivered.component';




@NgModule({
   imports: [
      SharedModule,
      TabOrdersDeliveredRoutingModule
   ],
   declarations: [TabOrdersDeliveredComponent]
})
export class TabOrdersDeliveredModule { }
