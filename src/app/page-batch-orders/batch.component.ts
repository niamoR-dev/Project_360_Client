import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-batchOrders',
   templateUrl: './batch.component.html',
   styleUrls: ['./batch.component.css']
})
export class batchOrdersComponent extends CoreBase implements OnInit {

   constructor(private miService: MIService, private userService: UserService) {
      super('batchOrdersComponent');
   }

   ngOnInit() {

   }
}
