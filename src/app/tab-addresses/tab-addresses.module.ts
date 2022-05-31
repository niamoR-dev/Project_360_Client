import { NgModule } from '@angular/core';
import { TabAddressesRoutingModule } from './tab-addresses-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TabAddressesComponent } from './tab-addresses/tab-addresses.component';

@NgModule({

  imports: [
    SharedModule,
    TabAddressesRoutingModule
  ],
  declarations: [TabAddressesComponent]
})
export class TabAddressesModule { }
