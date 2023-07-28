import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { TabDeliveryComponent } from './tab-delivery/tab-delivery.component';
import { TabDeliveryRoutingModule } from '../Routes/tab-delivery-routing.module';




@NgModule({
   imports: [
      SharedModule,
      TabDeliveryRoutingModule
   ],
   declarations: [TabDeliveryComponent]
})
export class TabDeliveryModule { }
