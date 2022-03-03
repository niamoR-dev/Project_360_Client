import { Injectable, OnInit } from "@angular/core";
import { IMIRequest, IMIResponse } from "@infor-up/m3-odin";
import { MIService, UserService } from "@infor-up/m3-odin-angular";
import { SohoMessageService } from "ids-enterprise-ng";
import { Observable, of, Subscription } from "rxjs";
import { map, catchError } from 'rxjs/internal/operators';
import { CunoHeaderService } from "../services/cuno-header-service/cuno-header.service";

@Injectable({ providedIn: 'root' })
export class OrdersService implements OnInit {

   cunoHeader: any;
   cunoSubscription: Subscription;

   constructor(protected miService: MIService, private userSevice: UserService, private messageService: SohoMessageService, private cunoHeaderService: CunoHeaderService) {
   }

   ngOnInit() {
   }


   cunoHeaderMethod() {
      this.cunoSubscription = this.cunoHeaderService.cunoSubject.subscribe(
         (data: any[]) => {
            this.cunoHeader = data;
         }
      );
      this.cunoHeaderService.subjectMethod();
   }

   listeOrders() {

      this.cunoHeaderMethod();

      return this.listAllOrders().pipe(map((answer) => {

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
         CUNO: this.cunoHeader,
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
