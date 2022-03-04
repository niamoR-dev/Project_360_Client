import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabLinesRoutingModule } from './tab-lines-routing.module';
import { TabLinesComponent } from './tab-line/tab-lines.component';




@NgModule({
   imports: [
      SharedModule,
      TabLinesRoutingModule
   ],
   declarations: [TabLinesComponent]
})
export class TabLinesModule { }
