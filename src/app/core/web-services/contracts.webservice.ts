import { Injectable } from "@angular/core";
import { IMIRequest, IMIResponse } from "@infor-up/m3-odin";
import { MIService } from "@infor-up/m3-odin-angular";
import { SohoMessageService } from "ids-enterprise-ng";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/internal/operators';

@Injectable({ providedIn: 'root' })
export class ContractsWebService {

   //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

   cunoHeader: any;


   //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components/services ///////////////////////////////////////////////////////////////////////////////////


   constructor(protected miService: MIService, private messageService: SohoMessageService) {
   }


   //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////

   recoveryCunoFromHeader(cuno: any) { // méthode qui récupère leCUNO du Header venant du component.ts Item Customer
      return of(this.cunoHeader = cuno);

   }

   listContracts() {


      return this.listAllContracts().pipe(map((answer) => {
         console.log('prout', answer)                       // méthode qui permets d'envoyer la donnée vers le TS
         if (answer.errorCode) {
            throw Error(JSON.stringify(answer));
         }
         return answer.items;
      }),
         catchError((error) => {                                                    // gestion d'erreur selon la méthode que l'on a déclaréer en dessous
            console.error('Erreur API list :', error);

            this.handleError('Échec de l\'exécution de l\'API list', error);
            return of(null);
         })
      );
   }


   //////////////////////////////////////////////////////////////////// Méthode Détails Grid ///////////////////////////////////////////////////////////////////////////////////

   // listDetailContracts() {

   //    return this.listALLDetailContracts().pipe(map((answer) => {                       // méthode qui permets d'envoyer la donnée vers le TS
   //       if (answer.errorCode) {
   //          throw Error(JSON.stringify(answer));
   //       }
   //       return answer.items;
   //    }),
   //       catchError((error) => {                                                    // gestion d'erreur selon la méthode que l'on a déclaréer en dessous
   //          console.error('Erreur API list :', error);

   //          this.handleError('Échec de l\'exécution de l\'API list', error);
   //          return of(null);
   //       })
   //    );
   // }

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


   private listAllContracts(): Observable<IMIResponse> {

      let inputFields: any = {                                                // ici on rentre les champs d'entrées obligatoires et optionnelles

         UYCUNO: 'NDUCLI03',
         UYAGNO: '',
         UYSTDT: ''

      }

      const request: IMIRequest = {                                                // ici, on renseigne les champs de sorties que l'on veut afficher
         program: 'CMS100MI',
         transaction: 'LstContrat',
         record: inputFields,
         outputFields: ['UYCUNO', 'UYAGNO', 'UYSTDT', 'UYAGTP', 'UYTX40', 'UYAGST'],
      };
      console.log('ca marche pas', request)
      return this.miService.execute(request);
   }
}











// import { Injectable } from '@angular/core';
// import { MIService } from '@infor-up/m3-odin-angular';
// import { SohoMessageService } from 'ids-enterprise-ng';
// import { of } from 'rxjs';

// @Injectable({
//    providedIn: 'root'
// })
// export class ContractsWebService {
//    listDetailContracts() {
//       throw new Error('Method not implemented.');
//    }

//    //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

//    cunoHeader: any;


//    //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components/services ///////////////////////////////////////////////////////////////////////////////////


//    constructor(protected miService: MIService, private messageService: SohoMessageService) { }


//    //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////


//    recoveryCunoFromHeader(cuno: any) { // méthode qui récupère leCUNO du Header venant du component.ts Adresse
//       return of(this.cunoHeader = cuno);

//    }


//    //////////////////////////////////////////////////////////////////// Méthodes qui gère les erreurs ///////////////////////////////////////////////////////////////////////////////////

//    private handleError(message: string, error?: any) {
//       const buttons = [{ text: 'Ok', click: (e, modal) => { modal.close(); } }];
//       this.messageService.error()
//          .title('An error occured')
//          .message(message + '. More details might be available in the browser console.')
//          .buttons(buttons)
//          .open();
//    }


//    //////////////////////////////////////////////////////////////////// Méthodes qui appellent les API   ///////////////////////////////////////////////////////////////////////////////////
// }
