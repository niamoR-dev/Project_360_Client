import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GeneralComponent } from './general/general.component';
import { GeneralRoutingModule } from './page-general-routing.module';



@NgModule({

   imports: [
      SharedModule,
      GeneralRoutingModule
   ],
   declarations: [GeneralComponent]
})
export class GeneralModule { }
