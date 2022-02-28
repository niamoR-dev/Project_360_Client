
import { Injectable } from '@angular/core';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { Observable, Subject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class CunoHeaderService {

   cuno: any = 15;
   cunoSubject = new Subject<any>();

   constructor(protected miService: MIService, private userSevice: UserService,) { }


   ngOnInit() {

   }


   methode() {
      this.cunoSubject.next(this.cuno);
   }



}
