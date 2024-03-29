import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabContractsComponent } from './tab-contracts/tab-contracts.component';


const routes: Routes = [


  {
    path: '',
    component: TabContractsComponent,
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabContractsRoutingModule { }
