import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabGeneralInfoComponent } from './tab-general/tab-general-info.component';

const routes: Routes = [

  {
    path: '',
    component: TabGeneralInfoComponent,
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabGeneralInfoRoutingModule { }
