import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

   {
      path: '',
      loadChildren: () => import('./tab-general/tab-general.module').then(m => m.TabGeneralModule)
   },


   {
      path: 'addresses',
      loadChildren: () => import('./tab-addresses/tab-addresses.module').then(m => m.TabAddressesModule)
   },


   {
      path: 'assortment',
      loadChildren: () => import('./tab-assortment/tab-assortment.module').then(m => m.TabAssortmentModule)
   },

   {
      path: 'contracts',
      loadChildren: () => import('./tab-contracts/tab-contracts.module').then(m => m.TabContractsModule)
   },

   {
      path: 'batch-orders',
      loadChildren: () => import('./tab-batch-orders/tab-batch-orders.module').then(m => m.TabBatchOrdersModule)
   },
   {
      path: 'fee',
      loadChildren: () => import('./tab-fee/tab-fee.module').then(m => m.TabFeeModule)
   },

   {
      path: 'offers',
      loadChildren: () => import('./tab-offers/tab-offers.module').then(m => m.TabOffersModule)
   },


   {
      path: 'line',
      loadChildren: () => import('./tab-line/tab-line.module').then(m => m.TabLineModule)
   },

   {
      path: 'orders',
      loadChildren: () => import('./tab-orders/tab-orders.module').then(m => m.TabOrdersModule)
   },

   {
      path: 'items-customers',
      loadChildren: () => import('./tab-items-customers/tab-items-customers.module').then(m => m.TabItemsCustomersModule)
   },

   {
      path: 'commercial-channel',
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
