import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';

@Component({
   selector: 'app-tab-delivery',
   templateUrl: './tab-delivery.component.html',
   styleUrls: ['./tab-delivery.component.css']
})
export class TabDeliveryComponent extends CoreBase implements OnInit {

   constructor() {
      super('TabDeliveryComponent');
   }

   ngOnInit(): void {
   }

}
