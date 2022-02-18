import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabItemsCustomersRoutingModule } from './tab-items-customers-routing.module';
import { TabItemsCustomersComponent } from './tab-items-customers/tab-items-customers.component';




@NgModule({
   imports: [
      SharedModule,
      TabItemsCustomersRoutingModule
   ],
   declarations: [TabItemsCustomersComponent]
})
export class TabItemsCustomersModule { }
