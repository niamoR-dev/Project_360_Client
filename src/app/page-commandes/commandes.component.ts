import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-commandes',
   templateUrl: './commandes.component.html',
   styleUrls: ['./commandes.component.css']
})
export class CommandesComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('CommandesComponent');
   }

   ngOnInit() {

   }





}
