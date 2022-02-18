import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabLineRoutingModule } from './tab-line-routing.module';
import { TabLineComponent } from './tab-line/tab-line.component';




@NgModule({
   imports: [
      SharedModule,
      TabLineRoutingModule
   ],
   declarations: [TabLineComponent]
})
export class TabLineModule { }
