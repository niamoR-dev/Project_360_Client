import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabOrdersDeliveredComponent } from './tab-orders-delivered/tab-orders-delivered.component';



const routes: Routes = [


  {
    path: '',
    component: TabOrdersDeliveredComponent,
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabOrdersDeliveredRoutingModule { }
