import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { AdressesService } from 'src/app/core/web-services/adresses.service';
import { LIST_ADDRESSES } from 'src/app/shared/mocks/list-address.mock';
import { HeaderService } from '../web-services/header.service';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.css']
})
export class HeaderComponent extends CoreBase implements OnInit {

   listAddresses = LIST_ADDRESSES;

   listClients: any[];
   cunoHeader: any;

   constructor(private miService: MIService, private userService: UserService, private headerService: HeaderService, private adressesService: AdressesService) {
      super('HeaderComponent');
   }


   ngOnInit() {
      this.headerService.listeClients().subscribe(data => {

         this.listClients = data;
      });
   }

   onSelectedClient(numberClient: any) {
      this.cunoHeader = numberClient.data;
      this.sendToService();
   }

   sendToService() {
      this.adressesService.cuno = this.cunoHeader;
   }

   //aller se renseigner sur les Subject + sauvegarde value : adresseService : cono$ = Subject<String>;
}
