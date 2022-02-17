import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabGeneralRoutingModule } from './tab-general-routing.module';
import { TabGeneralComponent } from './tab-general/tab-general.component';



@NgModule({

   imports: [
      SharedModule,
      TabGeneralRoutingModule
   ],
   declarations: [TabGeneralComponent]
})
export class TabGeneralModule { }
