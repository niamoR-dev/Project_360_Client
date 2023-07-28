import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { TabItemsCustomersComponent } from './tab-items-customers/tab-items-customers.component';
import { TabItemsCustomersRoutingModule } from '../Routes/tab-items-customers-routing.module';




@NgModule({
   imports: [
      SharedModule,
      TabItemsCustomersRoutingModule
   ],
   declarations: [TabItemsCustomersComponent]
})
export class TabItemsCustomersModule { }
