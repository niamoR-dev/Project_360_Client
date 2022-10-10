import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { LIST_ADDRESSES } from 'src/app/shared/mocks/list-address.mock';
import { CunoHeaderService } from '../../services/cuno-header-service/cuno-header.service';
import { HeaderWebService } from '../../web-services/header.webservice';

@Component({
  selector: 'app-tabs-header',
  templateUrl: './tabs-header.component.html',
  styleUrls: ['./tabs-header.component.css']
})
export class TabsHeaderComponent extends CoreBase implements OnInit {

  tabsList = LIST_ADDRESSES;

  constructor() {
    super('TabsHeaderComponent');
  }



  ngOnInit() {


  }
}
