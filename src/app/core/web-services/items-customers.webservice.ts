import { Injectable, OnInit } from "@angular/core";
import { IMIRequest, IMIResponse } from "@infor-up/m3-odin";
import { MIService } from "@infor-up/m3-odin-angular";
import { SohoMessageService } from "ids-enterprise-ng";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/internal/operators';

@Injectable({ providedIn: 'root' })
export class ItemsCustomersWebService implements OnInit {

   cunoHeader: any;

   constructor(protected miService: MIService, private messageService: SohoMessageService) {
   }

   ngOnInit() {
   }

   recoveryCunoFromHeader(cuno: any) { // méthode qui récupère leCUNO du Header venant du component.ts Item Customer
      return of(this.cunoHeader = cuno);

   }

   listeItemsCustomers() {


      return this.listAllItemsCustomers().pipe(map((answer) => {                       // méthode qui permets d'envoyer la donnée vers le TS
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

   listDetailItemCustomer() {

      return this.listALLDetailItemCustomer().pipe(map((answer) => {                       // méthode qui permets d'envoyer la donnée vers le TS
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


   private listAllItemsCustomers(): Observable<IMIResponse> {

      let inputFields: any = {                                                // ici on rentre les champs d'entrées obligatoires et optionnelles

         CUNO: this.cunoHeader
      }

      const request: IMIRequest = {                                                // ici, on renseigne les champs de sorties que l'on veut afficher
         program: 'OIS005MI',
         transaction: 'List',
         record: inputFields,
         outputFields: ['CUNO', 'ITNO', 'ITDS'],
      };
      return this.miService.execute(request);
   }


   private listALLDetailItemCustomer(): Observable<IMIResponse> {

      let inputFields: any = {                                                // ici on rentre les champs d'entrées obligatoires et optionnelles

         CUNO: this.cunoHeader
      }

      const request: IMIRequest = {                                                // ici, on renseigne les champs de sorties que l'on veut afficher
         program: 'OIS005MI',
         transaction: 'List',
         record: inputFields,
         outputFields: ['¨POPN', 'ALUMN', 'D2QT', 'D3QT', 'RESP', 'ADCU'],
      };
      return this.miService.execute(request);
   }


}
