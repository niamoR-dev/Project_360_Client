import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabItemsCustomersComponent } from '../tab-items-customers/tab-items-customers/tab-items-customers.component';



const routes: Routes = [


  {
    path: '',
    component: TabItemsCustomersComponent,
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabItemsCustomersRoutingModule { }
