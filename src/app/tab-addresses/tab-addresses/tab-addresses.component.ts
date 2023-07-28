import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreBase, IMIRequest } from '@infor-up/m3-odin';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from 'src/app/core/services/data-for-tab-header-service/data-for-tab-header.service';
import { APIWebService } from 'src/app/core/web-services/api.webservice';

@Component({
  selector: 'app-tab-addresses',
  templateUrl: './tab-addresses.component.html',
  styleUrls: ['./tab-addresses.component.css']
})
export class TabAddressesComponent extends CoreBase implements OnInit {

  @ViewChild('addresses',{ static: true }) addresses?: SohoDataGridComponent;

//////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

  datagridOptions: SohoDataGridOptions = {};

  cuno: any;
  cono: any;
  adrt: any;
  adid: any;
  cunm: any;
  cua1: any;
  cua2: any;
  cua3: any;
  cua4: any;
  phno: any;
  tfno: any;
  meal: any;
  yref: any;
  ealo: any;
  modl: any;
  tedl: any;
  vrno: any;

  varadrt: any;
  varadid: any;

  show: boolean; // permets l'affichage de détails au clique, doit faire une fonction ou un bouton SI pour enlever l'affichage

  listAddresses: any; // tableau pour enregistrer le retour d'API des adresses d'un client

  detailsAddressesLstAddrByCust: any; // tableau pour enregistrer le retour d'API des détails des adresses d'un client

  cunoHeader$: any;
  cunoSubscription: Subscription;



//////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////

  constructor(private dataForTabHeaderService: DataForTabHeaderService, private apiWebService: APIWebService, private messageService: SohoMessageService) {    // ici on fait le lien vers les autres components
    super('TabAddressesComponent');
  }

//////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////

  ngOnInit() {                                                   // à l'ouverture de l'onglet, ce que l'on codde ici se lance

    this.initGridAdresses();
    this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO

  }

//////////////////////////////////////////////////////////////////// Méthodes ngOnInit  ///////////////////////////////////////////////////////////////////////////////////

private handleError(message: string, error?: any) {
  const buttons = [{ text: 'Ok', click: (e, modal) => { modal.close(); } }];
  this.messageService.error()
    .title('An error occured')
    .message(message + '. More details might be available in the browser console.')
    .buttons(buttons)
    .open();
}


  private cunoHeaderMethod() {    // méthode observable pour récupérer la CUNO de la dropdown du header
    this.cunoSubscription = this.dataForTabHeaderService.cunoSubject.subscribe(
      (data: any) => {
        this.cunoHeader$ = data;
        this.getAllAdressesIMIRequest();
      }
    );
  }


  private getAllAdressesIMIRequest() { // mettre la IMIRequest

    const requestTest4: IMIRequest = {

      program: 'CRS610MI',
      transaction: 'LstAddresses',
      record: {
        CONO: '100',
        CUNO: this.cunoHeader$
      },
      outputFields: ['ADRT', 'ADID', 'CUNM', 'CUA1', 'CUA2', 'CUA3', 'CUA4'],
      // maxReturnedRecords: 50
    };


    this.apiWebService.callAPI(requestTest4).subscribe(
      data => {

        this.listAddresses = data.items;
        this.addresses.dataset = this.listAddresses;

      },(error) => {
        // gestion d'erreur selon la méthode que l'on a déclaréer en dessous
       console.error('Erreur API :', error);
       this.handleError('Échec de l\'exécution de l\'API ', error);
     });
  }



//////////////////////////////////////////////////////////////////// Méthodes qui gère l'affichage Grid ///////////////////////////////////////////////////////////////////////////////////

  private initGridAdresses() {                             // méthode qui permet d'afficher les données dans la GRID
    const options: SohoDataGridOptions = {
      selectable: 'single' as SohoDataGridSelectable,
      disableRowDeactivation: true,
      clickToSelect: true,
      alternateRowShading: true,
      cellNavigation: false,
      idProperty: 'ListAddresses',
      paging: true,
      pagesize: 10,
      indeterminate: false,
      columns: [
        {
          width: 50, id: 'selectionCheckbox', field: '', name: '', sortable: false,
          resizable: false, align: 'center', formatter: Soho.Formatters.SelectionCheckbox, hidden: true
        },
        {
          width: 'auto', id: 'col-adrt', field: 'ADRT', name: 'Type de livraison',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-adid', field: 'ADID', name: 'Code adresse',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cunm', field: 'CUNM', name: 'Nom',
          resizable: true, filterType: 'text', sortable: true
        },
        {
          width: 'auto', id: 'col-cua1', field: 'CUA1', name: 'Adresse',
          resizable: true, filterType: 'text', sortable: true
        },
      ],
      dataset: this.listAddresses,
      emptyMessage: {
        title: 'Aucune adresse à afficher',
        icon: 'icon-empty-no-data'
      }
    };
    this.datagridOptions = options;
  }


  //////////////////////////////////////////////////////////////////// Méthodes qui gère le formulaire d'affichage Détail ///////////////////////////////////////////////////////////////////////////////////

  onSelectedLine(args: any[]) {                                        // méthode pour gérer quand on cique sur une ligne

    const newCount = args.length;
    const selected = args && newCount === 1 ? args[0].data : null;

    this.varadid = selected.ADID;
    this.varadrt = selected.ADRT;

    this.show = true;

    this.cunm = selected.CUNM;
    this.cua1 = selected.CUA1;
    this.cua2 = selected.CUA2;
    this.cua3 = selected.CUA3;
    this.cua4 = selected.CUA4;
    this.adid = selected.ADID;
    this.adrt = selected.ADRT;

    this.getDetailsAdressIMIRequest();
  }


  private getDetailsAdressIMIRequest() { // API CMS100 GetBasicData

    const requestDetailAdress: IMIRequest = {

      program: 'CRS610MI',
      transaction: 'GetAddress',
      record: {
        CONO: '100',
        CUNO: this.cunoHeader$,
        ADRT: this.varadrt,
        ADID: this.varadid,
      },
      outputFields: ['PHNO', 'YREF', 'EALO', 'TFNO', 'MEAL', 'MODL', 'TEDL', 'VRNO'],
      // maxReturnedRecords: 50
    };

    this.apiWebService.callAPI(requestDetailAdress).subscribe(data => {

      //this.detailsAddressesLstAddrByCust = data;

      this.phno = data[0].PHNO;
      this.tfno = data[0].TFNO;
      this.yref = data[0].YREF;
      this.ealo = data[0].EALO;
      this.meal = data[0].MEAL;
      this.modl = data[0].MODL;
      this.tedl = data[0].TEDL;
      this.vrno = data[0].VRNO;

    });

  }



  private ngOnDestroy() {               // obligatoire dans chaque onglet dès qu'on a une variable : Subscription, va fermer l'observable à la fermeture de l'onglet
    console.log("UNSUBSCRIBE Adresse")  // permets d'optimiser la gestion débit de données
    this.cunoSubscription.unsubscribe();
  }



}
