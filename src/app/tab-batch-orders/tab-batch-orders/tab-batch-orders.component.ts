import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-tab-batchOrders',
   templateUrl: './tab-batch-orders.component.html',
   styleUrls: ['./tab-batch-orders.component.css']
})
export class TabBatchOrdersComponent extends CoreBase implements OnInit {

   constructor(private miService: MIService, private userService: UserService) {
      super('TabBatchOrdersComponent');
   }

   ngOnInit() {
      prompt("yo");
   }
}
