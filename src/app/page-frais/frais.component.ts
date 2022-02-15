import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-frais',
   templateUrl: './frais.component.html',
   styleUrls: ['./frais.component.css']
})
export class FraisComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('FraisComponent');
   }

   ngOnInit() {

   }





}
