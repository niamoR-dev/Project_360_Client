import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabContractsRoutingModule } from './tab-contracts-routing.module';
import { TabContractsComponent } from './tab-contracts/tab-contracts.component';

@NgModule({
   imports: [
      SharedModule,
      TabContractsRoutingModule
   ],
   declarations: [TabContractsComponent]
})
export class TabContractsModule { }
