import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { Subscription } from 'rxjs';
import { DataForTabHeaderService } from '../services/data-for-tab-header-service/data-for-tab-header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends CoreBase implements OnInit {

  client$: any[];
  cunoSubscription: Subscription;


  constructor(public dataForTabHeaderService: DataForTabHeaderService) {
    super('HeaderComponent');
  }




  ngOnInit() {
    this.clientSelectedHeaderMethod();

  }

  private clientSelectedHeaderMethod() {    // méthode observable pour récupérer la CUNO de la dropdown du header
    this.cunoSubscription = this.dataForTabHeaderService.clientFullDtataSubject.subscribe(
      (data: any) => {
        console.log("fnjsdnfojshsdnjfdsnj", data)
        this.client$ = data;
        console.log("c oucoucouo", this.client$)
        console.log("c oucoucouo", this.client$[0].CUNO)
      }
    );
  }


  ngOnDestroy() {
    // this.whloHeader = this.ngSelect.WHLO;


  }
}
