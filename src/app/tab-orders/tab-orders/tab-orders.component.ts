import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-tab-orders',
   templateUrl: './tab-orders.component.html',
   styleUrls: ['./tab-orders.component.css']
})
export class TabOrdersComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('TabOrdersComponent');
   }

   ngOnInit() {

   }





}
