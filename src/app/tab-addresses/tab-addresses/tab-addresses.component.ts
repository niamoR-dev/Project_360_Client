import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
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

  // ici on déclare les champs qui sont utilisées dans le template
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

  show: boolean; // permets l'affichage de détails au clique


  listAddressesClient: any[]; // tableau pour enregistrer le retour d'API des adresses d'un client

  detailsAddressesLstAddrByCust: any[]; // tableau pour enregistrer le retour d'API des détails des adresses d'un client

  cunoHeader$: any;
  cunoSubscription: Subscription;

  //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////

  constructor(private adressesWebService: AdressesWebService, private cunoHeaderService: CunoHeaderService) {    // ici on fait le lien vers les autres components
    super('TabAddressesComponent');
  }

  //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////

  ngOnInit() {                                                   // à l'ouverture de l'onglet, ce que l'on codde ici se lance

    this.cunoHeaderMethod(); // lancement de la méthode de récupération du CUNO

  }


  //////////////////////////////////////////////////////////////////// Méthodes ngOnInit  ///////////////////////////////////////////////////////////////////////////////////




  cunoHeaderMethod() {    // méthode observable pour récupérer la CUNO de la dropdown du header
    this.cunoSubscription = this.cunoHeaderService.cunoSubject.subscribe(
      (data: any) => {
        this.cunoHeader$ = data;

        this.sendCunoToAddressesWebService(); // lancement de la méthode de récupération du CUNO

        this.recoveryDataFromAPI(); // lancement de la méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

      }

    );
  }



  sendCunoToAddressesWebService() {       // méthode obesevable pour envoyer la CUNO de le webService de Adresse
    this.adressesWebService.recoveryCunoFromHeader(this.cunoHeader$).subscribe();
  }



  recoveryDataFromAPI() {             // méthode de récupération des donnés qui lance aussi l'initialisation de la Grid

    this.adressesWebService.listeAdresses().subscribe(data => {
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

    this.cuno = selected.CUNO;
    this.cunm = selected.CUNM;
    this.cua1 = selected.CUA1;
    this.cua2 = selected.CUA2;
    this.cua3 = selected.CUA3;
    this.cua4 = selected.CUA4;
    this.adid = selected.ADID;
    this.adrt = selected.ADRT;

    this.sendKeyForDetailToService(this.cunoHeader$, this.adrt, this.adid);
    this.InitDetailAdressLstAddrByCust();
  }

  sendKeyForDetailToService(cuno: any, adrt: any, adid: any) { // méthode qui permets d'envoyer les champs d'entrées pour le detail dfans le addressesService
    this.adressesWebService.recoveryClientForDetail(cuno, adrt, adid).subscribe();
  }


  private InitDetailAdressLstAddrByCust() { // API CMS100 GetBasicData

    this.adressesWebService.detailsAddressesLstAddrByCust().subscribe(data => {
      this.detailsAddressesLstAddrByCust = data;
      this.phno = this.detailsAddressesLstAddrByCust[0].OPPHNO;
      this.tfno = this.detailsAddressesLstAddrByCust[0].OPTFNO;
      this.yref = this.detailsAddressesLstAddrByCust[0].OPYREF;
      this.ealo = this.detailsAddressesLstAddrByCust[0].OPEALO;
      this.meal = this.detailsAddressesLstAddrByCust[0].OPMEAL;
      this.modl = this.detailsAddressesLstAddrByCust[0].OPMODL;
      this.tedl = this.detailsAddressesLstAddrByCust[0].OPTEDL;
      this.vrno = this.detailsAddressesLstAddrByCust[0].OPVRNO;

      //  console.log(" GetBasicData  ", this.detailsAddressesGetBasicData)  // la virgule d ans le console log permets de lire à 'intérieur de l'objet

    });
  }


  ngOnDestroy() {
    this.cunoSubscription.unsubscribe();
  }



}
