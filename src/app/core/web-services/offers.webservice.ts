import { Injectable } from '@angular/core';
import { MIService } from '@infor-up/m3-odin-angular';
import { SohoMessageService } from 'ids-enterprise-ng';
import { of } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class OffersWebService {

   //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

   cunoHeader: any;


   //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components/services ///////////////////////////////////////////////////////////////////////////////////


   constructor(protected miService: MIService, private messageService: SohoMessageService) { }


   //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////


   recoveryCunoFromHeader(cuno: any) { // méthode qui récupère leCUNO du Header venant du component.ts Adresse
      return of(this.cunoHeader = cuno);

   }


   //////////////////////////////////////////////////////////////////// Méthodes qui gère les erreurs ///////////////////////////////////////////////////////////////////////////////////

   private handleError(message: string, error?: any) {
      const buttons = [{ text: 'Ok', click: (e, modal) => { modal.close(); } }];
      this.messageService.error()
         .title('An error occured')
         .message(message + '. More details might be available in the browser console.')
         .buttons(buttons)
         .open();
   }


   //////////////////////////////////////////////////////////////////// Méthodes qui appellent les API   ///////////////////////////////////////////////////////////////////////////////////



}
