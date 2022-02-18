import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-tab-items-customers',
   templateUrl: './tab-items-customers.component.html',
   styleUrls: ['./tab-items-customers.component.css']
})
export class TabItemsCustomersComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('TabItemsCustomersComponent');
   }

   ngOnInit() {

   }





}
