import { Injectable } from "@angular/core";
import { IMIRequest, IMIResponse } from "@infor-up/m3-odin";
import { MIService, UserService } from "@infor-up/m3-odin-angular";
import { SohoMessageService } from "ids-enterprise-ng";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/internal/operators';

@Injectable({ providedIn: 'root' })
export class HeaderWebService {



  constructor(protected miService: MIService, private userSevice: UserService, private messageService: SohoMessageService) {
  }




  //////////////////////////////////////////////////////////////////// Méthodes qui envoient les données dans le TS ///////////////////////////////////////////////////////////////////////////////////


  listeClients() {
    return this.listAllClients().pipe(map((answer) => {                       // méthode qui permets d'envoyer la donnée vers le TS
      console.log(answer)
      if (answer.errorCode) {
        throw Error(JSON.stringify(answer));
      }
      return answer.items;
    }),
      catchError((error) => {                                                    // gestion d'erreur selon la méthode que l'on a déclaréer en dessous
        console.error('Erreur API lstByName :', error);

        this.handleError('Échec de l\'exécution de l\'API lstByName', error);
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


  private listAllClients(): Observable<IMIResponse> {

    let inputFields: any = {                                                // ici on rentre les champs d'entrées obligatoires et optionnelles

    }

    const request: IMIRequest = {                                                // ici, on renseigne les champs de sorties que l'on veut afficher
      program: 'CRS610MI',
      transaction: 'LstByName',
      record: inputFields,
      maxReturnedRecords: 0,
      outputFields: ['CUNM', 'CUNO', 'WHLO'],
    };
    return this.miService.execute(request);
  }

}
