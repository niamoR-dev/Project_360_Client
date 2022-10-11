import { EventEmitter, Injectable, Output } from '@angular/core';
import { MIService } from '@infor-up/m3-odin-angular';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class WhloHeaderService {

   whlo: any;
   firstValueWhlo: any;
   whloSubject: BehaviorSubject<any> = new BehaviorSubject(null);

   constructor(protected miService: MIService) {
   }


   ngOnInit() {

   }


   whloToSend(whlo: any): Observable<any> { // méthode qui réceptionne la Cuno venant du header
      this.whlo = whlo
      return this.whlo.asObservable();
   }


   subjectMethod() {
      this.whloSubject.next(this.whlo);
   }


}