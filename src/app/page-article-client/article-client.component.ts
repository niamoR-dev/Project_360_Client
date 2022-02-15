import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-article-client',
   templateUrl: './article-client.component.html',
   styleUrls: ['./article-client.component.css']
})
export class ArticleClientComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('ArticleClientComponent');
   }

   ngOnInit() {

   }





}
