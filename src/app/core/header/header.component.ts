import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends CoreBase implements OnInit {


  whloHeader: any;




  constructor() {
    super('HeaderComponent');
  }




  ngOnInit() {


  }

  ngOnDestroy() {
    // this.whloHeader = this.ngSelect.WHLO;


  }
}
