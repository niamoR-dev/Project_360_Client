import { EventEmitter, Injectable, Output } from '@angular/core';
import { MIService } from '@infor-up/m3-odin-angular';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class CunoHeaderService {

   cuno: any;
   firstValueCuno: any;
   cunoSubject: BehaviorSubject<any> = new BehaviorSubject(null);

   constructor(protected miService: MIService) {
   }


   ngOnInit() {

   }


   cunoToSend(cuno: any): Observable<any> { // méthode qui réceptionne la Cuno venant du header
      this.cuno = cuno
      return this.cuno.asObservable();
   }


   subjectMethod() {
      this.cunoSubject.next(this.cuno);
   }


}
