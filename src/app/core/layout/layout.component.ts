import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-layout',
   templateUrl: './layout.component.html',
   styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends CoreBase implements OnInit {



   constructor(private miService: MIService, private userService: UserService) {
      super('LayoutComponent');
   }


   ngOnInit() {

   }

}
