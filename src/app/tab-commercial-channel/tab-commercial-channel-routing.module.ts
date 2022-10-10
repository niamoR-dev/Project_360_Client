import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabCommercialChannelComponent } from './tab-commercial-channel/tab-commercial-channel.component';

const routes: Routes = [


  {
    path: '',
    component: TabCommercialChannelComponent,
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabCommercialChannelRoutingModule { }
