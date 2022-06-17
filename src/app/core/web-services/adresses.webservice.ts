import { Injectable } from "@angular/core";
import { IMIRequest, IMIResponse } from "@infor-up/m3-odin";
import { MIService } from "@infor-up/m3-odin-angular";
import { SohoMessageService } from "ids-enterprise-ng";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/internal/operators';

@Injectable({ providedIn: 'root' })
export class AdressesWebService {

  //////////////////////////////////////////////////////////////////// Déclaration des variables ///////////////////////////////////////////////////////////////////////////////////

  cunoHeader: any;
  cunoTemplate: any;
  adrtTemplate: any;
  adidTemplate: any;


  //////////////////////////////////////////////////////////////////// Constructeur d'appel des autres components/services ///////////////////////////////////////////////////////////////////////////////////


  constructor(protected miService: MIService, private messageService: SohoMessageService) {
  }


  //////////////////////////////////////////////////////////////////// Méthode Init ///////////////////////////////////////////////////////////////////////////////////



  recoveryCunoFromHeader(cuno: any) { // méthode qui récupère leCUNO du Header venant du component.ts Adresse
    return of(this.cunoHeader = cuno);

  }

  recoveryClientForDetail(cuno: any, adrt: any, adid: any) { // méthode qui récupère leCUNO du Header venant du component.ts Adresse
    this.cunoTemplate = cuno;
    this.adrtTemplate = adrt;
    this.adidTemplate = adid;
    return of(this.cunoTemplate, this.adrtTemplate, this.adidTemplate);

  }


  listeAdresses() {
    this.listDetailsAddressLstAddrByCust();
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

  //////////////////////////////////////////////////////////////////// Méthode Details Grid ///////////////////////////////////////////////////////////////////////////////////



  detailsAddressesLstAddrByCust() {
    return this.listDetailsAddressLstAddrByCust().pipe(map((answer) => {
      if (answer.errorCode) {
        throw Error(JSON.stringify(answer));
      }
      return answer.items;
    }),
      catchError((error) => {
        console.error('Erreur API LstAddrByCust :', error);

        this.handleError('Échec de l\'exécution de l\'API LstAddrByCust', error);
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
      CUNO: this.cunoHeader
    }

    const request: IMIRequest = {                                                // ici, on renseigne les champs de sorties que l'on veut afficher
      program: 'CRS610MI',
      transaction: 'LstAddresses',
      record: inputFields,
      outputFields: ['ADRT', 'ADID', 'CUNM', 'CUA1', 'CUA2', 'CUA3', 'CUA4'],
    };
    return this.miService.execute(request);
  }



  private listDetailsAddressLstAddrByCust(): Observable<IMIResponse> {
    let inputFields: any = {
      OPCUNO: this.cunoHeader,
      OPADRT: this.adrtTemplate,
      OPADID: this.adidTemplate

    }

    const request: IMIRequest = {
      program: 'CMS100MI',
      transaction: 'Lst360CusAdress',
      record: inputFields,
      outputFields: ['OPPHNO', 'OPYREF', 'OPEALO', 'OPTFNO', 'OPMEAL', 'OPMODL', 'OPTEDL', 'OPVRNO'],
    };

    return this.miService.execute(request);
  }

}
