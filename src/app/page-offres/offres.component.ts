import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-offres',
   templateUrl: './offres.component.html',
   styleUrls: ['./offres.component.css']
})
export class OffresComponent extends CoreBase implements OnInit {

   constructor(private miService: MIService, private userService: UserService) {
      super('OffresComponent');
   }

   ngOnInit() {

   }
}
