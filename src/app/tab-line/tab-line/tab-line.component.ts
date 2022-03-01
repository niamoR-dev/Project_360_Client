import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-tab-line',
   templateUrl: './tab-line.component.html',
   styleUrls: ['./tab-line.component.css']
})
export class TabLineComponent extends CoreBase implements OnInit {

   constructor(private miService: MIService, private userService: UserService) {
      super('TabLineComponent');
   }

   ngOnInit() {

   }

}
