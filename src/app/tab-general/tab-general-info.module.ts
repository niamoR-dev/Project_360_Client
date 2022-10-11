import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabGeneralInfoRoutingModule } from './tab-general-info-routing.module';
import { TabGeneralInfoComponent } from './tab-general/tab-general-info.component';



@NgModule({

   imports: [
      SharedModule,
      TabGeneralInfoRoutingModule
   ],
   declarations: [TabGeneralInfoComponent]
})
export class TabGeneralInfoModule { }
