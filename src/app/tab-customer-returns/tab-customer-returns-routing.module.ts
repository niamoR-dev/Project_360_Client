import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabCustomerReturnsComponent } from './tab-customer-returns/tab-customer-returns.component';

const routes: Routes = [


   {
      path: '',
      component: TabCustomerReturnsComponent
   }


];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class TabCustomerReturnsRoutingModule { }
