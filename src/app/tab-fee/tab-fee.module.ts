import { NgModule } from '@angular/core';
import { TabFeeRoutingModule } from './tab-fee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TabFeeComponent } from './tab-fee/tab-fee.component';

@NgModule({
   imports: [
      SharedModule,
      TabFeeRoutingModule
   ],
   declarations: [TabFeeComponent]
})
export class TabFeeModule { }
