import { Component, OnInit } from '@angular/core';
import { OutletContext } from '@angular/router';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { AdressesService } from '../shared/webservices/adresses.service';

@Component({
   selector: 'app-adresses',
   templateUrl: './adresses.component.html',
   styleUrls: ['./adresses.component.css']
})
export class AdressesComponent extends CoreBase implements OnInit {

   //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

   datagridOptions: SohoDataGridOptions = {}; // je sais pas

   // ici on déclare les champs qui sont utilisées dans le template
   cuno: any;
   cono: any;
   adrt: any;
   adid: any;
   cunm: any;
   cua1: any;
   phno: any;
   tfno: any;
   meal: any;
   yref: any;
   ealo: any;
   modl: any;
   tedl: any;

   show: boolean; // permets l'affichage de détails au clique


   listAddressesClient: any[]; // tableau pour enregistrer le retour d'API des adresses d'un client

   detailsAddressesGetBasicData: any[]; // tableau pour enregistrer le retour d'API des détails des adresses d'un client

   detailsAddressesGetOrderInfo: any[];


   //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components ///////////////////////////////////////////////////////////////////////////////////

   constructor(private miService: MIService, private userService: UserService, private adressesService: AdressesService) {    // ici on fait le lien vers les autres components
      super('AdressesComponent');
   }

   //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////

   ngOnInit() {                                                   // à l'ouverture de l'onglet, ce que l'on codde ici se lance
      this.adressesService.listeAdresses().subscribe(data => {

         this.listAddressesClient = data;
         this.initGridAdresses();
      });

   }


   //////////////////////////////////////////////////////////////////// Méthodes ///////////////////////////////////////////////////////////////////////////////////



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


   onSelectedLine(args: any[]) {                                        // méthode pour gérer quand on cique sur une ligne

      const newCount = args.length;
      const selected = args && newCount === 1 ? args[0].data : null;

      this.show = true;

      this.InitDetailAdressGetBasicData();
      this.InitDetailAdressGetOrderInfo();

      this.cuno = selected.CUNO;
      this.cunm = selected.CUNM;
      this.cua1 = selected.CUA1;
      this.adid = selected.ADID;

   }


   private InitDetailAdressGetBasicData() { // API 610 GetBasicData

      this.adressesService.detailsAddressesGetBasicData().subscribe(data => {
         this.detailsAddressesGetBasicData = data;

         this.phno = this.detailsAddressesGetBasicData[0].PHNO;
         this.tfno = this.detailsAddressesGetBasicData[0].TFNO;
         this.yref = this.detailsAddressesGetBasicData[0].YREF;
         this.ealo = this.detailsAddressesGetBasicData[0].EALO;
         this.meal = this.detailsAddressesGetBasicData[0].MEAL;

         console.log(" GetBasicData  ", this.detailsAddressesGetBasicData)  // la virgule d ans le console log permets de lire à 'intérieur de l'objet

      });
   }


   private InitDetailAdressGetOrderInfo() {  // API 610 GetOrderInfo

      this.adressesService.detailsAddressesGetOrderInfo().subscribe(data => {

         this.detailsAddressesGetOrderInfo = data;

         console.log("GetOrderInfo ", this.detailsAddressesGetOrderInfo)

         this.modl = this.detailsAddressesGetOrderInfo[0].MODL;
         this.tedl = this.detailsAddressesGetOrderInfo[0].TEDL;
      });


   }




}
