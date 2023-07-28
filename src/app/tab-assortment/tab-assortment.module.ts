import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabAssortmentComponent } from './tab-assortment/tab-assortment.component';
import { TabAssortmentRoutingModule } from '../Routes/tab-assortment-routing.module';

@NgModule({
   imports: [
      SharedModule,
      TabAssortmentRoutingModule
   ],
   declarations: [TabAssortmentComponent]
})
export class TabAssortmentModule { }
