import { NgModule } from '@angular/core';
import { TabCommercialChannelRoutingModule } from './tab-commercial-channel-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TabCommercialChannelComponent } from './tab-commercial-channel/tab-commercial-channel.component';

@NgModule({
   imports: [
      SharedModule,
      TabCommercialChannelRoutingModule
   ],
   declarations: [TabCommercialChannelComponent]
})
export class TabCommercialChannelModule { }
