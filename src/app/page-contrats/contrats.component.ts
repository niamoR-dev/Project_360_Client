import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-contrats',
   templateUrl: './contrats.component.html',
   styleUrls: ['./contrats.component.css']
})
export class ContratsComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('ContratsComponent');
   }

   ngOnInit() {

   }





}
