import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { M3OdinModule } from '@infor-up/m3-odin-angular';
import { SohoComponentsModule } from 'ids-enterprise-ng';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/components/header/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { TabCommercialChannelModule } from '../tab-commercial-channel/tab-commercial-channel.module';
import { TabAssortmentModule } from '../tab-assortment/tab-assortment.module';
import { TabAddressesModule } from '../tab-addresses/tab-addresses.module';
import { TabBatchOrdersModule } from '../tab-batch-orders/tab-batch-orders.module';
import { TabContractsModule } from '../tab-contracts/tab-contracts.module';
import { TabFeeModule } from '../tab-fee/tab-fee.module';
import { TabGeneralModule } from '../tab-general/tab-general.module';
import { TabItemsCustomersModule } from '../tab-items-customers/tab-items-customers.module';
import { TabLineModule } from '../tab-line/tab-line.module';
import { TabOffersModule } from '../tab-offers/tab-offers.module';
import { TabOrdersModule } from '../tab-orders/tab-orders.module';

@NgModule({
   declarations: [
      LayoutComponent

   ],

   imports: [
      CommonModule,
      SohoComponentsModule,
      M3OdinModule,
      FormsModule,
      RouterModule,
      SharedModule,
      TabAssortmentModule,
      TabContractsModule,
      TabAddressesModule,
      TabGeneralModule,
      TabBatchOrdersModule,
      TabOffersModule,
      TabLineModule,
      TabOrdersModule,
      TabItemsCustomersModule,
      TabFeeModule,
      TabCommercialChannelModule
   ],

   exports: [
      HeaderComponent,
      CommonModule,
      SohoComponentsModule,
      M3OdinModule,
      FormsModule,
      RouterModule,
      SharedModule,
      TabAssortmentModule,
      TabContractsModule,
      TabAddressesModule,
      TabGeneralModule,
      TabBatchOrdersModule,
      TabOffersModule,
      TabLineModule,
      TabOrdersModule,
      TabItemsCustomersModule,
      TabFeeModule,
      TabCommercialChannelModule
   ]
})
export class CoreModule { }
