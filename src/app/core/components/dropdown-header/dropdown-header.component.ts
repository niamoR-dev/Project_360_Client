import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { DataForTabHeaderService } from '../../services/data-for-tab-header-service/data-for-tab-header.service';
import { HeaderWebService } from '../../web-services/header.webservice';

@Component({
  selector: 'app-dropdown-header',
  templateUrl: './dropdown-header.component.html',
  styleUrls: ['./dropdown-header.component.css']
})
export class DropdownHeaderComponent extends CoreBase implements OnInit {

  listClients: any[];

  ngSelect: any;




  constructor(private headerWebService: HeaderWebService, private dataForTabHeaderService: DataForTabHeaderService) {
    super('DropdownHeaderComponent');
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

    this.dataForTabHeaderService.clientSubjectMethod(this.ngSelect); // le ngSelect ici est porteur des données du clients par défaut ou sélectionné dans la liste des clients.
  }                                                          // contient CUNO, CUNM, WHLO
}
