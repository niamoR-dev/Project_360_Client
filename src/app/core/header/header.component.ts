import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { LIST_ADDRESSES } from 'src/app/shared/mocks/list-address.mock';
import { CunoHeaderService } from '../services/cuno-header-service/cuno-header.service';
import { HeaderWebService } from '../web-services/header.webservice';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.css']
})
export class HeaderComponent extends CoreBase implements OnInit {

   listAddresses = LIST_ADDRESSES;

   listClients: any[];
   cunoHeader: any;


   constructor(private headerWebService: HeaderWebService, private cunoHeaderService: CunoHeaderService) {
      super('HeaderComponent');
   }



   ngOnInit() {
      this.headerWebService.listeClients().subscribe(data => {

         this.listClients = data;

      });


   }



   onSelectedClient(numberClient: any) {
      this.cunoHeader = numberClient.data;

      this.sendToService();
   }



   sendToService() {
      this.cunoHeaderService.cunoToSend(this.cunoHeader).subscribe();

   }




   //aller se renseigner sur les Subject + sauvegarde value : adresseService : cono$ = Subject<String>;
}
