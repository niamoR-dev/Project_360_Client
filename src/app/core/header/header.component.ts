import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends CoreBase implements OnInit {







  constructor() {
    super('HeaderComponent');
  }



  ngOnInit() {


   }



   onSelectedClient(numberClient: any) {
      this.cunoHeader = numberClient.data;
      console.log(numberClient.data);
      this.sendToService();
   }



   sendToService() {
      this.cunoHeaderService.cunoToSend(this.cunoHeader).subscribe();

   }


   ngOnDestroy() {

   }

   //aller se renseigner sur les Subject + sauvegarde value : adresseService : cono$ = Subject<String>;
}
