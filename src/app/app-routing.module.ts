import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdressesComponent } from './page-adresses/adresses.component';
import { GeneralComponent } from './page-general/general.component';

const routes: Routes = [
   //{ path: '', redirectTo: '/pays', pathMatch: 'full' },
   // { path: '', component: GeneralComponent },
   // { path: 'general', component: GeneralComponent },
   // { path: 'adresses', component: AdressesComponent },
];

@NgModule({
   imports: [RouterModule.forRoot(routes, { useHash: true })],
   exports: [RouterModule]
})
export class AppRoutingModule { }
