import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { AdressesWebService } from 'src/app/core/web-services/adresses.webservice';
import { LIST_ADDRESSES } from 'src/app/shared/mocks/list-address.mock';
import { HeaderWebService } from '../../../../core/web-services/header.webservice';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.css']
})
export class HeaderComponent extends CoreBase implements OnInit {

   listAddresses = LIST_ADDRESSES;

   listClients: any[];
   cunoHeader: any;
   cuno: string;

   constructor(private miService: MIService, private userService: UserService, private headerWebService: HeaderWebService, private adressesWebService: AdressesWebService) {
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
      this.adressesWebService.cuno = this.cunoHeader;
   }

   //aller se renseigner sur les Subject + sauvegarde value : adresseService : cono$ = Subject<String>;
}
