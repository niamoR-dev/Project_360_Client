import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabOffersComponent } from './tab-offers/tab-offers.component';



const routes: Routes = [


   {
      path: '',
      component: TabOffersComponent
   }


];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class TabOrdersRoutingModule { }
