import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabContractsComponent } from './tab-contracts/tab-contracts.component';
import { TabContractsRoutingModule } from '../Routes/tab-contracts-routing.module';

@NgModule({
   imports: [
      SharedModule,
      TabContractsRoutingModule
   ],
   declarations: [TabContractsComponent]
})
export class TabContractsModule { }
