import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-general',
   templateUrl: './general.component.html',
   styleUrls: ['./general.component.css']
})
export class GeneralComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('GeneralComponent');
   }

   ngOnInit() {

   }





}
