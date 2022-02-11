import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-client',
   templateUrl: './client.component.html',
   styleUrls: ['./client.component.css']
})
export class ClientComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('ClientComponent');
   }

   ngOnInit() {

   }





}
