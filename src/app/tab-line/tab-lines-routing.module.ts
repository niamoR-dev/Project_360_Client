import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabLinesComponent } from './tab-line/tab-lines.component';



const routes: Routes = [


   {
      path: '',
      component: TabLinesComponent
   }


];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class TabLinesRoutingModule { }
