import { Injectable } from '@angular/core';
import { IMIRequest, IMIResponse } from "@infor-up/m3-odin";
import { MIService } from '@infor-up/m3-odin-angular';
import { SohoMessageService } from 'ids-enterprise-ng';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';

@Injectable({
   providedIn: 'root'
})
export class BatchOrdersWebService {

   //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

   cunoHeader: any;


   //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components/services ///////////////////////////////////////////////////////////////////////////////////


   constructor(protected miService: MIService, private messageService: SohoMessageService) { }


   //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////


   recoveryCunoFromHeader(cuno: any) { // méthode qui récu père leCUNO du Header venant du component.ts Adresse
      return of(this.cunoHeader = cuno);

   }

   listeBatchOrder() {

      return this.listAllBatchOrder().pipe(map((answer) => {                       // méthode qui permets d'envoyer la donnée vers le TS
         if (answer.errorCode) {
            throw Error(JSON.stringify(answer));
         }
         return answer.items;
      }),
         catchError((error) => {                                                    // gestion d'erreur selon la méthode que l'on a déclaréer en dessous
            console.error('Erreur API listAddresses :', error);

            this.handleError('Échec de l\'exécution de l\'API listAddresses', error);
            return of(null);
         })
      );
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

   private listAllBatchOrder(): Observable<IMIResponse> {

      let inputFields: any = {                                                // ici on rentre les champs d'entrées obligatoires et optionnelles
         //CONO: '100',
         CUNO: this.cunoHeader
      }

      const request: IMIRequest = {                                                // ici, on renseigne les champs de sorties que l'on veut afficher
         program: 'OIS060MI',
         transaction: 'LstCustBlkAgr',
         record: inputFields,
         outputFields: ['CUNO','AGNO', 'STDT','AGDT', 'AGTP', 'TX40'],
      };
      return this.miService.execute(request);
   }
}
