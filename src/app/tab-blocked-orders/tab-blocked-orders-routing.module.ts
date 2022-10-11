import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabBlockedOrdersComponent } from './tab-blocked-orders/tab-blocked-orders.component';


const routes: Routes = [


  {
    path: '',
    component: TabBlockedOrdersComponent,
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabBlockedOrdersRoutingModule { }
