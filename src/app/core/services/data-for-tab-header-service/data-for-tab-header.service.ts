import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataForTabHeaderService {

  cunoSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  whloSubject: BehaviorSubject<any> = new BehaviorSubject(null);


  clientSubjectMethod(client: any) {
    console.log('data =>', client);
    this.cunoSubject.next(client.CUNO);
    this.whloSubject.next(client.WHLO)
  }

  subjectMethod() {
  }



  // whloSubjectMethod(data: any){
  //    this.whloSubject.next(data);
  //    console.log(this.whloSubject);
  // }

}
