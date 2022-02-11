import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-CommandeComponent',
   templateUrl: './commande.component.html',
   styleUrls: ['./commande.component.css']
})
export class CommandeComponent extends CoreBase implements OnInit {

   constructor(private miService: MIService, private userService: UserService) {
      super('CommandeComponent');
   }

   ngOnInit() {

   }
}
