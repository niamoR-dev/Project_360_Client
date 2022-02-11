import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';

@Component({
   selector: 'app-article',
   templateUrl: './article.component.html',
   styleUrls: ['./article.component.css']
})
export class ArticleComponent extends CoreBase implements OnInit {


   constructor(private miService: MIService, private userService: UserService) {
      super('ArticleComponent');
   }

   ngOnInit() {

   }





}
