import { NgModule } from '@angular/core';
import { TabAssortmentRoutingModule } from './tab-assortment-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TabAssortmentComponent } from './tab-assortment/tab-assortment.component';

@NgModule({
   imports: [
      SharedModule,
      TabAssortmentRoutingModule
   ],
   declarations: [TabAssortmentComponent]
})
export class TabAssortmentModule { }
