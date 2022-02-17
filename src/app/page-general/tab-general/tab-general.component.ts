import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-tab-general',
   templateUrl: './tab-general.component.html',
   styleUrls: ['./tab-general.component.css']
})
export class TabGeneralComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('TabGeneralComponent');
   }

   ngOnInit() {

   }





}
