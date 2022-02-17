import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-tab-assortment',
   templateUrl: './tab-assortment.component.html',
   styleUrls: ['./tab-assortment.component.css']
})
export class TabAssortmentComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('TabAssortmentComponent');
   }

   ngOnInit() {
      prompt("coucou");

   }





}
