import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabGeneralComponent } from './tab-general/tab-general.component';

const routes: Routes = [

   {
      path: '',
      component: TabGeneralComponent
   }

];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class TabGeneralRoutingModule { }
