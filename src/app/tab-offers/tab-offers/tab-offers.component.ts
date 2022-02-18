import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-tab-offers',
   templateUrl: './tab-offers.component.html',
   styleUrls: ['./tab-offers.component.css']
})
export class TabOffersComponent extends CoreBase implements OnInit {

   constructor(private miService: MIService, private userService: UserService) {
      super('TabOffersComponent');
   }

   ngOnInit() {

   }
}
