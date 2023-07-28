import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabOrdersComponent } from '../tab-orders/tab-orders/tab-orders.component';



const routes: Routes = [


  {
    path: '',
    component: TabOrdersComponent,
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabOrdersRoutingModule { }
