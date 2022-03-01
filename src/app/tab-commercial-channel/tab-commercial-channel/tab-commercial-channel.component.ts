import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-tab-commercial-channel',
   templateUrl: './tab-commercial-channel.component.html',
   styleUrls: ['./tab-commercial-channel.component.css']
})
export class TabCommercialChannelComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('TabCommercialChannelComponent');
   }

   ngOnInit() {

   }





}
