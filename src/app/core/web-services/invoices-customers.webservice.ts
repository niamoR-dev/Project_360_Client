import { Injectable } from "@angular/core";
import { IMIRequest, IMIResponse } from "@infor-up/m3-odin";
import { MIService } from "@infor-up/m3-odin-angular";
import { SohoMessageService } from "ids-enterprise-ng";
import { Observable, of, Subscription } from "rxjs";
import { map, catchError } from 'rxjs/internal/operators';

@Injectable({ providedIn: 'root' })
export class InvoicesWebService {

  //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

  cunoHeader: any;
  cunoSubscription: Subscription;

  //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components/services ///////////////////////////////////////////////////////////////////////////////////

  constructor(protected miService: MIService, private messageService: SohoMessageService) {
  }


  //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////


  recoveryCunoFromHeader(cuno: any) { // méthode qui récupère leCUNO du Header venant du component.ts Invoices
    return of(this.cunoHeader = cuno);

  }

  //////////////////////////////////////////////////////////////////// Méthodes qui gère les erreurs ///////////////////////////////////////////////////////////////////////////////////


  listeInvoices() {


    return this.listAllInvoices().pipe(map((answer) => {

      if (answer.errorCode) {
        throw Error(JSON.stringify(answer));
      }
      return answer.items;
    }),
      catchError((error) => {                                                    // gestion d'erreur selon la méthode que l'on a déclaréer en dessous
        console.error('Erreur API listInvoices :', error);

        this.handleError('Échec de l\'exécution de l\'API listInvoices', error);
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


  private listAllInvoices(): Observable<IMIResponse> {

    let inputFields: any = {                                                // ici on rentre les champs d'entrées obligatoires et optionnelles

      // UHCUNO: this.cunoHeader,
      // UHIVNO: ''
      UHCONO: '100',
      UHPYNO: 'CHP_MEGAS'
    }

    const request: IMIRequest = {                                                // ici, on renseigne les champs de sorties que l'on veut afficher
      program: 'CMS100MI',
      transaction: 'Lst360CusInvoic',
      record: inputFields,
      outputFields: ['UHPYNO', 'UHEXIN', 'UHVONO', 'UHIVLA', 'UHDUDT', 'UHRIVN', 'UHYEA4', 'UHINPX', 'UHIVNO', 'UHIVTP'],
    };
    return this.miService.execute(request);
  }
}
