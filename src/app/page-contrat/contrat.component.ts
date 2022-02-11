import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-contrat',
   templateUrl: './contrat.component.html',
   styleUrls: ['./contrat.component.css']
})
export class ContratComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('ContratComponent');
   }

   ngOnInit() {

   }





}
