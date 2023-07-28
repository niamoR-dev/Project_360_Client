import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabAddressesComponent } from '../tab-addresses/tab-addresses/tab-addresses.component';

const routes: Routes = [


  {
    path: '',
    component: TabAddressesComponent,
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabAddressesRoutingModule { }
