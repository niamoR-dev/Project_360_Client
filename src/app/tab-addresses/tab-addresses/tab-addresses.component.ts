import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { CoreBase, IMIRequest } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { APIWebService } from 'src/app/core/web-services/api.webservice';
import { CunoHeaderService } from '../../core/services/cuno-header-service/cuno-header.service';
import { AdressesWebService } from '../../core/web-services/adresses.webservice';

@Component({
  selector: 'app-tab-addresses',
  templateUrl: './tab-addresses.component.html',
  styleUrls: ['./tab-addresses.component.css']
})
export class TabAddressesComponent extends CoreBase implements OnInit {

  //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

  datagridOptions: SohoDataGridOptions = {}; // je sais pas

  /////////////// ici on déclare les champs qui sont utilisées dans la grid template //////////////
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

  show: boolean; // permets l'affichage de détails au clique, doit faire une fonction ou un bouton SI pour enlever l'affichage


  listAddressesClient: any; // tableau pour enregistrer le retour d'API des adresses d'un client

  detailsAddressesLstAddrByCust: any; // tableau pour enregistrer le retour d'API des détails des adresses d'un client

  cunoHeader$: any;
  cunoSubscription: Subscription;



  //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////

  constructor(private cunoHeaderService: CunoHeaderService, private apiWebService: APIWebService) {    // ici on fait le lien vers les autres components
    super('TabAddressesComponent');
  }

  //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////

  ngOnInit() {                                                   // à l'ouverture de l'onglet, ce que l'on codde ici se lance

    this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO

  }


  //////////////////////////////////////////////////////////////////// Méthodes ngOnInit  ///////////////////////////////////////////////////////////////////////////////////




  private cunoHeaderMethod() {    // méthode observable pour récupérer la CUNO de la dropdown du header
    this.cunoSubscription = this.cunoHeaderService.cunoSubject.subscribe(
      (data: any) => {
        this.cunoHeader$ = data;
        this.getAllAdressesIMIRequest();
        // this.getAllAdresses();
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

    this.apiWebService.callAPI(requestTest4).subscribe(data => {

      this.listAddressesClient = data;
      this.initGridAdresses();      // lance l'initialisation de la Grid
    });
  }


  private getAllAdresses() { // mettre la IMIRequest

    let inputFieldInput: any = {                      // champs d'entrées obligatoires et optionnelles
      CONO: '100',
      CUNO: this.cunoHeader$
    };

    this.apiWebService.callAPI2('CRS610MI', 'LstAddresses',
      inputFieldInput,
      ['OPPHNO', 'OPYREF', 'OPEALO', 'OPTFNO', 'OPMEAL', 'OPMODL', 'OPTEDL', 'OPVRNO']

    ).subscribe(data => {

      this.listAddressesClient = data;

      this.initGridAdresses();      // lance l'initialisation de la Grid
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
      dataset: this.listAddressesClient,
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

    this.show = true;

    this.cunm = selected.CUNM;
    this.cua1 = selected.CUA1;
    this.cua2 = selected.CUA2;
    this.cua3 = selected.CUA3;
    this.cua4 = selected.CUA4;
    this.adid = selected.ADID;
    this.adrt = selected.ADRT;

    this.getDetailsAdress();
  }


  private getDetailsAdress() { // API CMS100 GetBasicData

    const requestDetailAdress: IMIRequest = {

      program: 'CMS100MI',
      transaction: 'LstAddrByCust',
      record: {
        OPCUNO: this.cunoHeader$,
        OPADRT: this.adrt,
        OPADID: this.adid,
      },
      outputFields: ['OPPHNO', 'OPYREF', 'OPEALO', 'OPTFNO', 'OPMEAL', 'OPMODL', 'OPTEDL', 'OPVRNO'],
      // maxReturnedRecords: 50
    };

    this.apiWebService.callAPI(requestDetailAdress).subscribe(data => {

      //this.detailsAddressesLstAddrByCust = data;

      this.phno = data[0].OPPHNO;
      this.tfno = data[0].OPTFNO;
      this.yref = data[0].OPYREF;
      this.ealo = data[0].OPEALO;
      this.meal = data[0].OPMEAL;
      this.modl = data[0].OPMODL;
      this.tedl = data[0].OPTEDL;
      this.vrno = data[0].OPVRNO;

    });

  }



  private ngOnDestroy() {
    console.log("UNSUBSCRIBE Adresse")
    this.cunoSubscription.unsubscribe();
  }



}
