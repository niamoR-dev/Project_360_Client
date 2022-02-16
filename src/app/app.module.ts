import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Log } from '@infor-up/m3-odin';
import { M3OdinModule } from '@infor-up/m3-odin-angular';
import { SohoComponentsModule } from 'ids-enterprise-ng'; // TODO Consider only importing individual SoHo modules in production
import { AppComponent } from './app.component';
import { GeneralComponent } from './page-general/general.component';
import { AdressesComponent } from './page-adresses/adresses.component';
import { ArticleClientComponent } from './page-article-client/article-client.component';
import { batchOrdersComponent } from './page-batch-orders/batch.component';
import { LigneComponent } from './page-ligne/ligne.component';
import { OffresComponent } from './page-offres/offres.component';
import { CircuitComComponent } from './page-circuit-com/circuitCom.component';
import { ContratsComponent } from './page-contrats/contrats.component';
import { FraisComponent } from './page-frais/frais.component';
import { CommandesComponent } from './page-commandes/commandes.component';
import { AssortimentComponent } from './page-assortiment/assortiment.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AdressesService } from './shared/webservices/adresses.service';
import { HeaderService } from './shared/webservices/header.service';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
   declarations: [
      AppComponent,
      GeneralComponent,
      AdressesComponent,
      ArticleClientComponent,
      OffresComponent,
      LigneComponent,
      batchOrdersComponent,
      ContratsComponent,
      FraisComponent,
      CircuitComComponent,
      CommandesComponent,
      FraisComponent,
      CircuitComComponent,
      CommandesComponent,
      AssortimentComponent,
      HeaderComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      SohoComponentsModule,
      M3OdinModule,
      RouterModule
   ],
   providers: [
      AdressesService,
      HeaderService,
      AppRoutingModule,
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
