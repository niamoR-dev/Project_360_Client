import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-circuitCom',
   templateUrl: './circuitCom.component.html',
   styleUrls: ['./circuitCom.component.css']
})
export class CircuitComComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('CircuitComComponent');
   }

   ngOnInit() {

   }





}