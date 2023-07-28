import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TabCommercialChannelComponent } from './tab-commercial-channel/tab-commercial-channel.component';
import { TabCommercialChannelRoutingModule } from '../Routes/tab-commercial-channel-routing.module';

@NgModule({
   imports: [
      SharedModule,
      TabCommercialChannelRoutingModule
   ],
   declarations: [TabCommercialChannelComponent]
})
export class TabCommercialChannelModule { }
