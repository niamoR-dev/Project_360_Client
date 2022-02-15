import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { HeaderService } from '../../webservices/header.service';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.css']
})
export class HeaderComponent extends CoreBase implements OnInit {

   listClients: any[];

   constructor(private miService: MIService, private userService: UserService, private headerService: HeaderService) {
      super('HeaderComponent');
   }



   ngOnInit() {
      this.headerService.listeClients().subscribe(data => {

         this.listClients = data;
         console.log("listClients :", this.listClients);
      });
   }
}
