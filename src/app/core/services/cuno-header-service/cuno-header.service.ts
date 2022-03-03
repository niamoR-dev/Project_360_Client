import { Injectable } from '@angular/core';
import { MIService } from '@infor-up/m3-odin-angular';
import { of, Subject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class CunoHeaderService {

   cuno: any;
   cunoSubject = new Subject<any>();

   constructor(protected miService: MIService) {
   }


   ngOnInit() {

   }


   cunoToSend(cuno: any) { // méthode qui réceptionne la Cuno venant du header
      return of(this.cuno = cuno);
   }


   subjectMethod() {
      this.cunoSubject.next(this.cuno);

   }



}
