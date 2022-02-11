import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Log } from '@infor-up/m3-odin';
import { M3OdinModule } from '@infor-up/m3-odin-angular';
import { SohoComponentsModule } from 'ids-enterprise-ng'; // TODO Consider only importing individual SoHo modules in production
import { AppComponent } from './app.component';
import { GeneralComponent } from './page-general/general.component';
import { AdresseComponent } from './page-adresse/adresse.component';
import { ClientComponent } from './page-client/client.component';
import { ArticleComponent } from './page-article/article.component';
import { batchOrdersComponent } from './page-batch-orders/batch.component';
import { LigneComponent } from './page-ligne/ligne.component';
import { OffresComponent } from './page-offres/offres.component';
import { CircuitComComponent } from './page-circuit-com/circuitCom.component';
import { ContratComponent } from './page-contrat/contrat.component';
import { FraisComponent } from './page-frais/frais.component';
import { CommandesComponent } from './page-commandes/commandes.component';
import { AssortimentComponent } from './page-assortiment/assortiment.component';

@NgModule({
   declarations: [
      AppComponent,
      GeneralComponent,
      AdresseComponent,
      ClientComponent,
      ArticleComponent,
      OffresComponent,
      LigneComponent,
      batchOrdersComponent,
      ContratComponent,
      FraisComponent,
      CircuitComComponent,
      CommandesComponent,
      ContratComponent,
      FraisComponent,
      CircuitComComponent,
      CommandesComponent,
      AssortimentComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      SohoComponentsModule,
      M3OdinModule
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
