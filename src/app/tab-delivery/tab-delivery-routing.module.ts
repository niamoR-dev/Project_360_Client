import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabDeliveryComponent } from './tab-delivery/tab-delivery.component';




const routes: Routes = [


   {
      path: '',
      component: TabDeliveryComponent
   }


];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class TabDeliveryRoutingModule { }
