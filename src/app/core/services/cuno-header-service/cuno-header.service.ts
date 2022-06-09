import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CunoHeaderService {

  cunoSubject: BehaviorSubject<any> = new BehaviorSubject(null);


  clientSubjectMethod(client: any) {

    this.cunoSubject.next(client.CUNO);

  }

  subjectMethod() {

  }
}
