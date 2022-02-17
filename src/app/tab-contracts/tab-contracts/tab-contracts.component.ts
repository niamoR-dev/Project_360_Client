import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-tab-contrats',
   templateUrl: './tab-contracts.component.html',
   styleUrls: ['./tab-contracts.component.css']
})
export class TabContractsComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('TabContractsComponent');
   }

   ngOnInit() {

   }





}
