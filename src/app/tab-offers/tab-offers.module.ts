import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabOffersComponent } from './tab-offers/tab-offers.component';
import { TabOrdersRoutingModule } from './tab-offersrouting.module';




@NgModule({
   imports: [
      SharedModule,
      TabOrdersRoutingModule
   ],
   declarations: [TabOffersComponent]
})
export class TabOffersModule { }
