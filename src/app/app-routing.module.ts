import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header/header.component';

const routes: Routes = [

   {
      path: '',
      component: HeaderComponent,
      loadChildren: () => import('./page-general/page-general.module').then(m => m.GeneralModule)
   },


   {
      path: 'addresses',
      component: HeaderComponent,
      loadChildren: () => import('./page-adresses/page-adresses.module').then(m => m.AdressesModule)
   },


   {
      path: 'assortment',
      component: HeaderComponent,
      loadChildren: () => import('./tab-assortment/tab-assortment.module').then(m => m.TabAssortmentModule)
   },


   {
      path: '',
      redirectTo: '',
      pathMatch: 'full'
   },

   // {
   //    path:'**',
   //    //component :NotFoundComponent
   // }

];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
