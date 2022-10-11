import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CunoHeaderService {

   cunoSubject: BehaviorSubject<any> = new BehaviorSubject(null);
   whloSubject: BehaviorSubject<any> = new BehaviorSubject(null);


  clientSubjectMethod(client: any) {

    this.cunoSubject.next(client.CUNO);

  }

  subjectMethod() {

   cunoSubjectMethod(data: any) {
      this.cunoSubject.next(data.CUNO);  
      console.log('data =>',data);
      this.whloSubject.next(data.WHLO);
    }

   // whloSubjectMethod(data: any){
   //    this.whloSubject.next(data);
   //    console.log(this.whloSubject);
   // }


   subjectMethod() {
   }


}