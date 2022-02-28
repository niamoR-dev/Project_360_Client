import { NgModule } from '@angular/core';
import { CoreModule } from '../core.module';
import { LayoutComponent } from './layout.component';

@NgModule({
   imports: [
      CoreModule,
   ],
   declarations: [LayoutComponent]
})
export class LayoutModule { }
