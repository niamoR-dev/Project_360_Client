import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-ligne',
   templateUrl: './ligne.component.html',
   styleUrls: ['./ligne.component.css']
})
export class LigneComponent extends CoreBase implements OnInit {

   constructor(private miService: MIService, private userService: UserService) {
      super('LigneComponent');
   }

   ngOnInit() {

   }

}
