import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { DropdownHeaderComponent } from './components/dropdown-header/dropdown-header.component';
import { TabsHeaderComponent } from './components/tabs-header/tabs-header.component';


@NgModule({
  declarations: [
    HeaderComponent,
    DropdownHeaderComponent,
    TabsHeaderComponent
  ],

  imports: [
    SharedModule,
    CoreRoutingModule

  ],

  exports: [
    HeaderComponent,
    DropdownHeaderComponent,
    TabsHeaderComponent
  ]
})
export class CoreModule {


  /*
     Permet de placer le CoreModule en parent de tous les autres modules, si un autre module est

     importé dans le appModule l'application rentrera en conflit (mesure de sécurité)
  */

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {

    if (parentModule) {

      throw new Error('CoreModule is already loaded.');

    }

  }

}
