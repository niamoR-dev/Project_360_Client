import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabGeneralInfoComponent } from './tab-general/tab-general-info.component';
import { TabGeneralInfoRoutingModule } from '../Routes/tab-general-info-routing.module';



@NgModule({

   imports: [
      SharedModule,
      TabGeneralInfoRoutingModule
   ],
   declarations: [TabGeneralInfoComponent]
})
export class TabGeneralInfoModule { }
