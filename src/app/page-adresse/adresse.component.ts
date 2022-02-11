import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-adresse',
   templateUrl: './adresse.component.html',
   styleUrls: ['./adresse.component.css']
})
export class AdresseComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('AdresseComponent');
   }

   ngOnInit() {

   }





}
