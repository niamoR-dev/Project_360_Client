import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { AdressesService } from '../shared/webservices/adresses.service';

@Component({
   selector: 'app-adresses',
   templateUrl: './adresses.component.html',
   styleUrls: ['./adresses.component.css']
})
export class AdressesComponent extends CoreBase implements OnInit {

   datagridOptions: SohoDataGridOptions = {}; // je sais pas

   // ici on déclare les champs qui sont utilisées dans le template
   cuno: any;
   cono: any;
   adrt: any;
   adid: any;
   cunm: any;
   cua1: any;
   phno: any;

   show: boolean; // permets l'affichage de détails au clique


   listeImportee: any[]; // tableau pour enregistrer le retour d'API


   constructor(private miService: MIService, private userService: UserService, private adressesService: AdressesService) {    // ici on fait le lien vers les autres components
      super('AdressesComponent');
   }

   ngOnInit() {                                                   // à l'ouverture de l'onglet, ce que l'on codde ici se lance
      this.adressesService.listeAdresses().subscribe(data => {
         this.listeImportee = data;
         this.initGridAdresses();
      });

   }


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
         dataset: this.listeImportee,
         emptyMessage: {
            title: 'Aucune adresse à afficher',
            icon: 'icon-empty-no-data'
         }
      };
      this.datagridOptions = options;
   }


   onSelectedLine(args: any[]) {
      const newCount = args.length;
      const selected = args && newCount === 1 ? args[0].data : null;

      this.cuno = selected.CUNO;
      this.cunm = selected.CUNM;
      this.cua1 = selected.CUA1;
      this.adid = selected.ADID;
      this.show = true;
      // if (this.show = false) {
      //    this.show = true;
      // } else {
      //    this.show = false;
      // }

   }


   privateInitDetailAdress() {

   }
}
