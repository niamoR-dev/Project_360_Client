import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header/header.component';

const routes: Routes = [

   {
      path: '',
      component: HeaderComponent,
      loadChildren: () => import('./page-general/tab-general.module').then(m => m.TabGeneralModule)
   },


   {
      path: 'addresses',
      component: HeaderComponent,
      loadChildren: () => import('./page-adresses/tab-addresses.module').then(m => m.TabAddressesModule)
   },


   {
      path: 'assortment',
      component: HeaderComponent,
      loadChildren: () => import('./tab-assortment/tab-assortment.module').then(m => m.TabAssortmentModule)
   },

   {
      path: 'contracts',
      component: HeaderComponent,
      loadChildren: () => import('./tab-contracts/tab-contracts.module').then(m => m.TabContractsModule)
   },

   {
      path: 'fee',
      component: HeaderComponent,
      loadChildren: () => import('./tab-fee/tab-fee.module').then(m => m.TabFeeModule)
   },



   {
      path: '',
      redirectTo: '',
      pathMatch: 'full'
   },

   // {
   //    path:'**',
   //    //component :NotFoundComponent
   // }

];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
