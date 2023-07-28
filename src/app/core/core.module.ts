import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { DropdownHeaderComponent } from './components/dropdown-header/dropdown-header.component';
import { TabsHeaderComponent } from './components/tabs-header/tabs-header.component';
import { SohoMastheadDemoComponent } from './masthead/masthead.demo';
import { TabAddressesModule } from '../tab-addresses/tab-addresses.module';
import { TabAssortmentModule } from '../tab-assortment/tab-assortment.module';
import { TabBatchOrdersModule } from '../tab-batch-orders/tab-batch-orders.module';
import { TabBlockedOrdersModule } from '../tab-blocked-orders/tab-blocked-orders.module';
import { TabCommercialChannelModule } from '../tab-commercial-channel/tab-commercial-channel.module';
import { TabContractsModule } from '../tab-contracts/tab-contracts.module';
import { TabCustomerReturnsModule } from '../tab-customer-returns/tab-customer-returns.module';
import { TabDeliveryModule } from '../tab-delivery/tab-delivery.module';
import { TabGeneralInfoModule } from '../tab-general/tab-general-info.module';
import { TabFeeModule } from '../tab-fee/tab-fee.module';
import { TabInvoicesModule } from '../tab-invoices/tab-invoices-customers.module';
import { TabItemsCustomersModule } from '../tab-items-customers/tab-items-customers.module';
import { TabOffersModule } from '../tab-offers/tab-offers.module';
import { TabOrdersModule } from '../tab-orders/tab-orders.module';
import { SohoIconModule } from 'ids-enterprise-ng';


@NgModule({
  declarations: [
    HeaderComponent,
    DropdownHeaderComponent,
    TabsHeaderComponent,
    SohoMastheadDemoComponent
  ],

  imports: [
    SharedModule,
    TabAddressesModule,
    TabAssortmentModule,
    TabBatchOrdersModule,
    TabBlockedOrdersModule,
    TabCommercialChannelModule,
    TabContractsModule,
    TabCustomerReturnsModule,
    TabDeliveryModule,
    TabFeeModule,
    TabGeneralInfoModule,
    TabInvoicesModule,
    TabItemsCustomersModule,
    TabOffersModule,
    TabOrdersModule

  ],

  exports: [
    HeaderComponent,
    SohoMastheadDemoComponent,
    SohoIconModule
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
