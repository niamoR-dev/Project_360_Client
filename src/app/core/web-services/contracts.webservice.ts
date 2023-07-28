import { Injectable } from "@angular/core";
import { IMIRequest, IMIResponse } from "@infor-up/m3-odin";
import { MIService } from '@infor-up/m3-odin-angular';
import { SohoMessageService } from 'ids-enterprise-ng';
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/internal/operators';
//import { TabContractsComponent } from '../../tab-contracts/tab-contracts/tab-contracts.component';


@Injectable({
   providedIn: 'root'
})
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

   listeContracts() {

      return this.listAllContracts().pipe(map((answer) => {                       // méthode qui permets d'envoyer la donnée vers le TS
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

   listeContracts2() {

      return this.listAllContracts2().pipe(map((answer) => {                       // méthode qui permets d'envoyer la donnée vers le TS
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


   listContracts() {


    return this.listAllContracts().pipe(map((answer) => {                    // méthode qui permets d'envoyer la donnée vers le TS
      if (answer.errorCode) {
        throw Error(JSON.stringify(answer));
      }
      return answer.items;
    }),
      catchError((error) => {                                                    // gestion d'erreur selon la méthode que l'on a déclaréer en dessous
        console.error('Erreur API list :', error);

        this.handleError('Échec de l\'exécution de l\'API LstContrat', error);
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

   private listAllContracts2(): Observable<IMIResponse> {

      let inputFields: any = {                                                // ici on rentre les champs d'entrées obligatoires et optionnelles
         //CONO: '100',
         CUNO: this.cunoHeader,
         //AGNO: EnvoiAGNO(agno2: any)
      }

      const request: IMIRequest = {                                                // ici, on renseigne les champs de sorties que l'on veut afficher
         program: 'OIS060MI',
         transaction: 'LstAgrLnPrice',
         record: inputFields,
         outputFields: ['PREX'],
      };
      return this.miService.execute(request);
   }




   detailsContractsGetBasicData() {
   return this.listDetailsContratGetBasicData().pipe(map((answer) => {
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

   detailsContractsGetOrderInfo() {
      return this.listDetailsContratGetOrderInfo().pipe(map((answer) => {
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

   detailsContractGetFinancial() {
      return this.listDetailsContratGetFinancial().pipe(map((answer) => {
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

   private listDetailsContratGetBasicData(): Observable<IMIResponse> {
      console.log("  CUNO =", this.cunoHeader);


      let inputFields: any = {
         CUNO: this.cunoHeader
      }

      const request: IMIRequest = {
         program: 'OIS060MI',
         transaction: 'GetBasicData',
         record: inputFields,
         outputFields: ['CUNO','PHNO', 'YREF', 'EALO', 'TFNO', 'MEAL'],
      };

      return this.miService.execute(request);
   }



   private listDetailsContratGetOrderInfo(): Observable<IMIResponse> {
      let inputFields: any = {
         CUNO: this.cunoHeader
      }

      const request: IMIRequest = {
         program: 'OIS060MI',
         transaction: 'GetOrderInfo',
         record: inputFields,
         outputFields: ['MODL', 'TEDL'],
      };

      return this.miService.execute(request);
   }

   private listDetailsContratGetFinancial(): Observable<IMIResponse> {

         let inputFields: any = {
            CUNO: this.cunoHeader
         }

         const request: IMIRequest = {
            program: 'OIS060MI',
            transaction: 'GetFinancial',
            record: inputFields,
            outputFields: ['VRNO'],
         };

         return this.miService.execute(request);
   }

}
