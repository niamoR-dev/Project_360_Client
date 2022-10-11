import { Component, OnInit } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { LIST_TABS_ROOTING } from 'src/app/shared/mocks/list-tab-rooting.mock';
@Component({
  selector: 'app-tabs-header',
  templateUrl: './tabs-header.component.html',
  styleUrls: ['./tabs-header.component.css']
})
export class TabsHeaderComponent extends CoreBase implements OnInit {

  tabsList = LIST_TABS_ROOTING;

  constructor() {
    super('TabsHeaderComponent');
  }



  ngOnInit() {


  }
}
