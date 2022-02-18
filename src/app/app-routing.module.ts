import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header/header.component';

const routes: Routes = [

   {
      path: '',
      component: HeaderComponent,
      loadChildren: () => import('./tab-general/tab-general.module').then(m => m.TabGeneralModule)
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
      path: 'batch-orders',
      component: HeaderComponent,
      loadChildren: () => import('./tab-batch-orders/tab-batch-orders.module').then(m => m.TabBatchOrdersModule)
   },
   {
      path: 'fee',
      component: HeaderComponent,
      loadChildren: () => import('./tab-fee/tab-fee.module').then(m => m.TabFeeModule)
   },

   {
      path: 'offers',
      component: HeaderComponent,
      loadChildren: () => import('./tab-offers/tab-offers.module').then(m => m.TabOffersModule)
   },


   {
      path: 'line',
      component: HeaderComponent,
      loadChildren: () => import('./tab-line/tab-line.module').then(m => m.TabLineModule)
   },

   {
      path: 'orders',
      component: HeaderComponent,
      loadChildren: () => import('./tab-orders/tab-orders.module').then(m => m.TabOrdersModule)
   },

   {
      path: 'items-customers',
      component: HeaderComponent,
      loadChildren: () => import('./tab-items-customers/tab-items-customers.module').then(m => m.TabItemsCustomersModule)
   },

   {
      path: 'commercial-channel',
      component: HeaderComponent,
      loadChildren: () => import('./tab-commercial-channel/tab-commercial-channel.module').then(m => m.TabCommercialChannelModule)
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
   imports: [RouterModule.forRoot(routes,
      {
         preloadingStrategy: PreloadAllModules
      }
   )],
   exports: [RouterModule]
})
export class AppRoutingModule { }
