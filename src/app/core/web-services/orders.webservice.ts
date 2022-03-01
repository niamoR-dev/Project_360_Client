import { Injectable, OnInit } from "@angular/core";
import { IMIRequest, IMIResponse } from "@infor-up/m3-odin";
import { MIService, UserService } from "@infor-up/m3-odin-angular";
import { SohoMessageService } from "ids-enterprise-ng";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/internal/operators';

@Injectable({ providedIn: 'root' })
export class OrdersService implements OnInit {

   cuno: any;

   constructor(protected miService: MIService, private userSevice: UserService, private messageService: SohoMessageService) {
   }

   ngOnInit() {
   }


   listeOrders() {



      return this.listAllOrders().pipe(map((answer) => {                       // méthode qui permets d'envoyer la donnée vers le TS
         if (answer.errorCode) {
            throw Error(JSON.stringify(answer));
         }
         return answer.items;
      }),
         catchError((error) => {                                                    // gestion d'erreur selon la méthode que l'on a déclaréer en dessous
            console.error('Erreur API listOrders :', error);

            this.handleError('Échec de l\'exécution de l\'API listOrders', error);
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


   private listAllOrders(): Observable<IMIResponse> {

      let inputFields: any = {                                                // ici on rentre les champs d'entrées obligatoires et optionnelles
         CONO: '100',
         CUNO: 'CRZ-001',
         ORDT: '',
         ORST: ''
      }

      const request: IMIRequest = {                                                // ici, on renseigne les champs de sorties que l'on veut afficher
         program: 'OIS100MI',
         transaction: 'LstHead',
         record: inputFields,
         outputFields: ['RLDT', 'ORNO', 'ORDT', 'ORSL', 'ORST', 'CUCD', 'MODL', 'AGNT', 'CUOR'],
      };
      return this.miService.execute(request);
   }
}
