import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabBatchOrdersComponent } from './tab-batch-orders/tab-batch-orders.component';


const routes: Routes = [


  {
    path: '',
    component: TabBatchOrdersComponent,
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabBatchOrdersRoutingModule { }
