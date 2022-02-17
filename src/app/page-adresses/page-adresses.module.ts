import { NgModule } from '@angular/core';
import { AdressesRoutingModule } from './page-adresses-routing.module';
import { AdressesComponent } from './adresses/adresses.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
   imports: [
      SharedModule,
      AdressesRoutingModule
   ],
   declarations: [AdressesComponent]
})
export class AdressesModule { }
