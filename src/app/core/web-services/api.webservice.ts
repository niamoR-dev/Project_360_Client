import { Injectable } from '@angular/core';
import { IMIRequest, IMIResponse } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';
import { SohoMessageService } from 'ids-enterprise-ng';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class APIWebService {


  constructor(protected miService: MIService, private messageService: SohoMessageService) {
  }

  inputFieldInput: any = {                                                // ici on rentre les champs d'entrées obligatoires et optionnelles
    CONO: '100',
    CUNO: 'nknk'
  };

  outputFieldInput: any = ['OPPHNO', 'OPYREF', 'OPEALO', 'OPTFNO', 'OPMEAL', 'OPMODL', 'OPTEDL', 'OPVRNO'];

  programInput: string = 'CMS100MI';

  transactionInput: string = 'LstAddrByCust';


  inputFields: any = {
    // CONO: '100',
    // CUNO: this.cunoHeader


    // OPCUNO: this.cunoHeader,
    // OPADRT: this.adrtTemplate,
    // OPADID: this.adidTemplate

  }


  private handleError(message: string, error?: any) {
    const buttons = [{ text: 'Ok', click: (e, modal) => { modal.close(); } }];
    this.messageService.error()
      .title('An error occured')
      .message(message + '. More details might be available in the browser console.')
      .buttons(buttons)
      .open();
  }


  private callAPI(programInput: string, transactionInput: string, inputFieldInput?: any[], outputFieldInput?: any[], maxReturnedRecordsInput?: number): Observable<IMIResponse> {

    const request: IMIRequest = {
      program: programInput,
      transaction: transactionInput,
      record: inputFieldInput,
      outputFields: outputFieldInput,
      maxReturnedRecords: maxReturnedRecordsInput
    };

    return this.miService.execute(request).pipe(map((answer) => {                       // méthode qui permets d'envoyer la donnée vers le TS
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
    );;
  }
}
