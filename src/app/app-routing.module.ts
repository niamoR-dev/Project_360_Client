import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

   {
      path: '',
      loadChildren: () => import('./tab-general/tab-general-info.module').then(m => m.TabGeneralInfoModule)
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
      path: 'lines',
      loadChildren: () => import('./tab-line/tab-lines.module').then(m => m.TabLinesModule)
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
      path: 'invoices-customers',
      loadChildren: () => import('./tab-invoices/tab-invoices-customers.module').then(m => m.TabInvoicesModule)
   },
   {
      path: 'orders-delivered',
      loadChildren: () => import('./tab-orders-delivered/tab-orders-delivered.module').then(m => m.TabOrdersDeliveredModule)
   },
   {
      path: 'delivery',
      loadChildren: () => import('./tab-delivery/tab-delivery.module').then(m => m.TabDeliveryModule)
   },
   {
      path: 'blocked-orders',
      loadChildren: () => import('./tab-blocked-orders/tab-blocked-orders.module').then(m => m.TabBlockedOrdersModule)
   },
   {
      path: 'customer-returns',
      loadChildren: () => import('./tab-customer-returns/tab-customer-returns.module').then(m => m.TabCustomerReturnsModule)
   },
   {
      path: 'blocked-orders',
      loadChildren: () => import('./tab-blocked-orders/tab-blocked-orders.module').then(m => m.TabBlockedOrdersModule)
   },
   {
      path: 'customer-returns',
      loadChildren: () => import('./tab-customer-returns/tab-customer-returns.module').then(m => m.TabCustomerReturnsModule)
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
