import { Injectable, OnInit } from "@angular/core";
import { IMIRequest, IMIResponse } from "@infor-up/m3-odin";
import { MIService, UserService } from "@infor-up/m3-odin-angular";
import { SohoMessageService } from "ids-enterprise-ng";
import { Observable, of, Subject, Subscription } from "rxjs";
import { map, catchError } from 'rxjs/internal/operators';
import { CunoHeaderService } from "../services/cuno-header.service";

@Injectable({ providedIn: 'root' })
export class AdressesWebService implements OnInit {

   cuno: any;

   cunoSubscription: Subscription;

   constructor(protected miService: MIService, private userSevice: UserService, private messageService: SohoMessageService, private cunoHeaderService: CunoHeaderService) {
   }

   ngOnInit() {
      this.cunoSubscription = this.cunoHeaderService.cunoSubject.subscribe(
         (data: any[]) => {
            this.cuno = data;
         }
      );
      this.cunoHeaderService.methode();
   }


   listeAdresses() {



      return this.listAllAddresses().pipe(map((answer) => {                       // méthode qui permets d'envoyer la donnée vers le TS
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


   detailsAddressesGetBasicData() {
      return this.listDetailsAddressGetBasicData().pipe(map((answer) => {
         if (answer.errorCode) {
            throw Error(JSON.stringify(answer));
         }
         return answer.items;
      }),
         catchError((error) => {
            console.error('Erreur API GetBasicData :', error);

            this.handleError('Échec de l\'exécution de l\'API GetBasicData', error);
            return of(null);
         })
      );
   }


   detailsAddressesGetOrderInfo() {
      return this.listDetailsAddressGetOrderInfo().pipe(map((answer) => {
         if (answer.errorCode) {
            throw Error(JSON.stringify(answer));
         }
         return answer.items;
      }),
         catchError((error) => {
            console.error('Erreur API GetOrderInfo :', error);

            this.handleError('Échec de l\'exécution de l\'API GetOrderInfo', error);
            return of(null);
         })
      );
   }

   detailsAddressesGetFinancial() {
      return this.listDetailsAddressGetFinancial().pipe(map((answer) => {
         if (answer.errorCode) {
            throw Error(JSON.stringify(answer));
         }
         return answer.items;
      }),
         catchError((error) => {
            console.error('Erreur API GetFinancial :', error);

            this.handleError('Échec de l\'exécution de l\'API GetFinancial', error);
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


   private listAllAddresses(): Observable<IMIResponse> {

      let inputFields: any = {                                                // ici on rentre les champs d'entrées obligatoires et optionnelles
         CONO: '100',
         CUNO: this.cuno
      }

      const request: IMIRequest = {                                                // ici, on renseigne les champs de sorties que l'on veut afficher
         program: 'CRS610MI',
         transaction: 'LstAddresses',
         record: inputFields,
         outputFields: ['ADRT', 'ADID', 'CUNM', 'CUA1'],
      };
      return this.miService.execute(request);
   }



   private listDetailsAddressGetBasicData(): Observable<IMIResponse> {
      console.log("  CUNO =", this.cuno);


      let inputFields: any = {
         CONO: '100',
         CUNO: this.cuno
      }

      const request: IMIRequest = {
         program: 'CRS610MI',
         transaction: 'GetBasicData',
         record: inputFields,
         outputFields: ['PHNO', 'YREF', 'EALO', 'TFNO', 'MEAL'],
      };

      return this.miService.execute(request);
   }



   private listDetailsAddressGetOrderInfo(): Observable<IMIResponse> {
      let inputFields: any = {
         CONO: '100',
         CUNO: this.cuno
      }

      const request: IMIRequest = {
         program: 'CRS610MI',
         transaction: 'GetOrderInfo',
         record: inputFields,
         outputFields: ['MODL', 'TEDL'],
      };

      return this.miService.execute(request);
   }

   private listDetailsAddressGetFinancial(): Observable<IMIResponse> {

      let inputFields: any = {
         CONO: '100',
         CUNO: this.cuno
      }

      const request: IMIRequest = {
         program: 'CRS610MI',
         transaction: 'GetFinancial',
         record: inputFields,
         outputFields: ['VRNO'],
      };

      return this.miService.execute(request);
   }






}
