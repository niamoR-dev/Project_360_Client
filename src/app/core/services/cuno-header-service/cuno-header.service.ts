import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CunoHeaderService {

  cunoSubject: BehaviorSubject<any> = new BehaviorSubject(null);


  subject(data: any) {
    this.cunoSubject.next(data);

  }

  subjectMethod() {

  }
}
