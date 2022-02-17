import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-assortiment',
   templateUrl: './assortiment.component.html',
   styleUrls: ['./assortiment.component.css']
})
export class AssortimentComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('AssortimentComponent');
   }

   ngOnInit() {
      prompt("coucou");

   }





}
