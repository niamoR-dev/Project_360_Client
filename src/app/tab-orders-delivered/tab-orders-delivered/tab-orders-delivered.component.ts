import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';

@Component({
   selector: 'app-tab-orders-delivered',
   templateUrl: './tab-orders-delivered.component.html',
   styleUrls: ['./tab-orders-delivered.component.css']
})
export class TabOrdersDeliveredComponent extends CoreBase implements OnInit {

   constructor() {
      super('TabOrdersDeliveredComponent');
   }

   ngOnInit(): void {
   }

}
