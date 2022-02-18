import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabLineComponent } from './tab-line/tab-line.component';



const routes: Routes = [


   {
      path: '',
      component: TabLineComponent
   }


];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class TabLineRoutingModule { }
