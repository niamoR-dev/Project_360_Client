import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TabFeeComponent } from './tab-fee/tab-fee.component';
import { TabFeeRoutingModule } from '../Routes/tab-fee-routing.module';

@NgModule({
   imports: [
      SharedModule,
      TabFeeRoutingModule
   ],
   declarations: [TabFeeComponent]
})
export class TabFeeModule { }
