import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-tab-fee',
   templateUrl: './tab-fee.component.html',
   styleUrls: ['./tab-fee.component.css']
})
export class TabFeeComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('TabFeeComponent');
   }

   ngOnInit() {

   }





}
