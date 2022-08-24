import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { LIST_ADDRESSES } from '../../shared/mocks/list-address.mock';
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

  ngSelect: any;




  constructor(private headerWebService: HeaderWebService, private cunoHeaderService: CunoHeaderService) {
    super('HeaderComponent');
  }



  ngOnInit() {
    this.headerWebService.listeClients().subscribe(data => {  // au lancement de l'application, permets l'enregistrement de la liste des clients et le lancement de la valeur par défaut

      this.listClients = data;

      //this.listClients.map((client) => { client.CLIENTCOMPLET = client.CUNM + " / " + client.CUNO + " / " + client.WHLO });

      this.ngSelect = this.listClients[0];

      this.defaultClient();

    });

  }

  defaultClient() { // envoie la première valeur de la liste des clients, valeur par défaut dans toute l'application

    this.sendToService();
  }


  onSelectedClient() { // lorsqu'on change de clients dans la dropdown, la valeur se change automatiquement grâce au subjectBehavior

    this.sendToService();
  }


  sendToService() { // porte la donnée pour envoyer dans le servidce porteur du subect behavior

    this.cunoHeaderService.clientSubjectMethod(this.ngSelect); // le ngSelect ici est porteur des données du clients par défaut ou sélectionné dans la liste des clients.
  }                                                          // contient CUNO, CUNM, WHLO
}
