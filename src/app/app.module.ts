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
import { TabFeeModule } from './tab-fee/tab-fee.module';
import { TabCommercialChannelModule } from './tab-commercial-channel/tab-commercial-channel.module';

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
      TabFeeModule,
      TabCommercialChannelModule,
      TabAssortmentModule

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
