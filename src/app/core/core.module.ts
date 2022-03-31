import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { TabCommercialChannelModule } from '../tab-commercial-channel/tab-commercial-channel.module';
import { TabAssortmentModule } from '../tab-assortment/tab-assortment.module';
import { TabAddressesModule } from '../tab-addresses/tab-addresses.module';
import { TabBatchOrdersModule } from '../tab-batch-orders/tab-batch-orders.module';
import { TabContractsModule } from '../tab-contracts/tab-contracts.module';
import { TabFeeModule } from '../tab-fee/tab-fee.module';
import { TabGeneralInfoModule } from '../tab-general/tab-general-info.module';
import { TabItemsCustomersModule } from '../tab-items-customers/tab-items-customers.module';
import { TabLinesModule } from '../tab-line/tab-lines.module';
import { TabOffersModule } from '../tab-offers/tab-offers.module';
import { TabOrdersModule } from '../tab-orders/tab-orders.module';
import { TabInvoicesModule } from '../tab-invoices/tab-invoices-customers.module';
import { TabOrdersDeliveredModule } from '../tab-orders-delivered/tab-orders-delivered.module';
import { TabBlockedOrdersModule } from '../tab-blocked-orders/tab-blocked-orders.module';
import { TabCustomerReturnsModule } from '../tab-customer-returns/tab-customer-returns.module';



@NgModule({
   declarations: [
      HeaderComponent,

   ],

   imports: [
      SharedModule,
      TabAssortmentModule,
      TabContractsModule,
      TabAddressesModule,
      TabGeneralInfoModule,
      TabBatchOrdersModule,
      TabOffersModule,
      TabLinesModule,
      TabOrdersModule,
      TabItemsCustomersModule,
      TabFeeModule,
      TabCommercialChannelModule,
      TabInvoicesModule,
      TabOrdersDeliveredModule
      TabCommercialChannelModule,
      TabBlockedOrdersModule,
      TabCustomerReturnsModule,
   ],

   exports: [
      HeaderComponent,
   ]
})
export class CoreModule {


   /*
      Permet de placer le CoreModule en parent de tous les autres modules, si un autre module est

      importé dans le appModule l'application rentrera en conflit (mesure de sécurité)
   */

   constructor(@Optional() @SkipSelf() parentModule: CoreModule) {

      if (parentModule) {

         throw new Error('CoreModule is already loaded.');

      }

   }

}
