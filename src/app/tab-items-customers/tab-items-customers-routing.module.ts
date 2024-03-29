import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabItemsCustomersComponent } from './tab-items-customers/tab-items-customers.component';



const routes: Routes = [


  {
    path: '',
    component: TabItemsCustomersComponent,
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabItemsCustomersRoutingModule { }
