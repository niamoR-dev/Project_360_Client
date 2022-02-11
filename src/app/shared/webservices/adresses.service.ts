import { Injectable, OnInit } from "@angular/core";
import { IMIRequest, IMIResponse } from "@infor-up/m3-odin";
import { MIService, UserService } from "@infor-up/m3-odin-angular";
import { SohoMessageService } from "ids-enterprise-ng";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/internal/operators';

@Injectable()
export class AdressesService implements OnInit {


   constructor(protected miService: MIService, private userSevice: UserService, private messageService: SohoMessageService) {
   }

   ngOnInit() {
   }


   listeAdresses() {

      return this.listAllAdresses().pipe(map((answer) => {                       // méthode qui permets d'envoyer la donnée vers le TS
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


   private handleError(message: string, error?: any) {                               // Gestion de l'erreur de retour de données de API
      const buttons = [{ text: 'Ok', click: (e, modal) => { modal.close(); } }];
      this.messageService.error()
         .title('An error occured')
         .message(message + '. More details might be available in the browser console.')
         .buttons(buttons)
         .open();
   }


   private listAllAdresses(): Observable<IMIResponse> {                        // Ici on fait l'appel API

      let inputFields: any = {                                                // ici on rentre les champs d'entrées obligatoires et optionnelles
         CONO: '100',
         CUNO: '1004000699'
      }

      const request: IMIRequest = {                                                // ici, on renseigne les champs de sorties que l'on veut afficher
         program: 'CRS610MI',
         transaction: 'LstAddresses',
         record: inputFields,
         outputFields: ['ADRT', 'ADID', 'CUNM', 'CUA1'],
      };
      return this.miService.execute(request);
   }

   private listDetailsAdress(): Observable<IMIResponse> {                        // Ici on fait l'appel API

      let inputFields: any = {                                                // ici on rentre les champs d'entrées obligatoires et optionnelles
         CONO: '100',
         CUNO: '1004000699'
      }

      const request: IMIRequest = {                                                // ici, on renseigne les champs de sorties que l'on veut afficher
         program: 'CRS610MI',
         transaction: 'GetBasicData',
         record: inputFields,
         outputFields: ['ADRT', 'ADID', 'CUNM', 'CUA1'],
      };
      return this.miService.execute(request);
   }



}
