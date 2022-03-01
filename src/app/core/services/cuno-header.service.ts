
import { Injectable } from '@angular/core';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { Subject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class CunoHeaderService {

   cuno: any;
   cunoSubject = new Subject<any>();

   constructor(protected miService: MIService, private userSevice: UserService,) {
   }


   ngOnInit() {

   }

   cunoToSend(cuno: any) { // méthode qui réceptionne la Cuno venant du header

      return this.cuno = cuno;
   }


   subjectMethod() {
      this.cunoSubject.next(this.cuno);
   }



}
