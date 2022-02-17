import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabAssortmentComponent } from './tab-assortment/tab-assortment.component';

const routes: Routes = [


   {
      path: '',
      component: TabAssortmentComponent
   }


];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class TabAssortmentRoutingModule { }
