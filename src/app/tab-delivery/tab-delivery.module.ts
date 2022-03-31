import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabDeliveryRoutingModule } from './tab-delivery-routing.module';
import { TabDeliveryComponent } from './tab-delivery/tab-delivery.component';




@NgModule({
   imports: [
      SharedModule,
      TabDeliveryRoutingModule
   ],
   declarations: [TabDeliveryComponent]
})
export class TabDeliveryModule { }
