import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Log } from '@infor-up/m3-odin';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';



@NgModule({
   declarations: [
      AppComponent,


   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      CoreModule,
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
