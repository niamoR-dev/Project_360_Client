import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Log } from '@infor-up/m3-odin';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TabGeneralModule } from './page-general/tab-general.module';
import { SharedModule } from './shared/shared.module';
import { TabAssortmentModule } from './tab-assortment/tab-assortment.module';
import { TabContractsModule } from './tab-contracts/tab-contracts.module';
import { TabAddressesModule } from './page-adresses/tab-addresses.module';
import { TabBatchOrdersModule } from './tab-batch-orders/tab-batch-orders.module';
import { TabOffersModule } from './tab-offers/tab-offers.module';
import { TabLineModule } from './tab-line/tab-line.module';
import { TabOrdersModule } from './tab-orders/tab-orders.module';
import { TabItemsCustomersModule } from './tab-items-customers/tab-items-customers.module';

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      SharedModule,
      AppRoutingModule,
      TabAssortmentModule,
      TabContractsModule,
      TabAddressesModule,
      TabGeneralModule,
      TabAssortmentModule,
      TabAssortmentModule,
      TabBatchOrdersModule,
      TabOffersModule,
      TabLineModule,
      TabOrdersModule,
      TabItemsCustomersModule,

   ],
   providers: [
      {
         provide: LOCALE_ID,
         useValue: 'fr-FR',
      },
      {
         provide: APP_INITIALIZER,
         multi: true,
         useFactory: (locale: string) => () => {
            Soho.Locale.culturesPath = 'assets/ids-enterprise/js/cultures/';
            return Soho.Locale.set(locale).catch(err => {
               Log.error('Failed to set IDS locale', err);
            });
         },
         deps: [LOCALE_ID],
      }
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
