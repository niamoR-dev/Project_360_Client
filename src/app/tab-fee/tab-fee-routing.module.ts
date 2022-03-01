import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabFeeComponent } from './tab-fee/tab-fee.component';

const routes: Routes = [


   {
      path: '',
      component: TabFeeComponent
   }


];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class TabFeeRoutingModule { }
