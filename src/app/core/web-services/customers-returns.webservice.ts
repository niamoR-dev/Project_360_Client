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
export class CustomersReturnsWebService {

  //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

  cunoHeader: any;
  whloHeader: any;
  agnoWebService: any;


  //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components/services ///////////////////////////////////////////////////////////////////////////////////


  constructor(protected miService: MIService, private messageService: SohoMessageService) {
  }


  //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////

  recoveryCunoFromHeader(cuno: any) { // méthode qui récupère leCUNO du Header venant du component.ts Item Customer
    return of(this.cunoHeader = cuno);
  }



  recoveryWhloFromHeader(whlo: any) { // méthode qui récupère le WHLO du Header venant du component.ts Item Customer
    return of(this.whloHeader = whlo);
  }




  listeCustomersReturned() {
    return this.listCustomersReturn().pipe(map((answer) => {                       // méthode qui permets d'envoyer la donnée vers le TS

      console.log(answer)

      if (answer.errorCode) {
        throw Error(JSON.stringify(answer));
      }
      return answer.items;
    }),
      catchError((error) => {                                                    // gestion d'erreur selon la méthode que l'on a déclaréer en dessous
        console.error('Erreur API listCustomersRetun :', error);

        this.handleError('Échec de l\'exécution de l\'API listCustomersRetun', error);
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

  private listCustomersReturn(): Observable<IMIResponse> {

    let inputFields: any = {                                                // ici on rentre les champs d'entrées obligatoires et optionnelles

      CUNO: this.cunoHeader,
      WHLO: this.whloHeader
    }

    const request: IMIRequest = {                                                // ici, on renseigne les champs de sorties que l'on veut afficher
      program: 'OIS390MI',
      transaction: 'LstOpenLine',
      record: inputFields,
      outputFields: ['ITNO', 'WHLO', 'REPN', 'RELI', 'ORNO'],
    };
    return this.miService.execute(request);
  }

}
