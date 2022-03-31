import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabInvoicesComponent } from './tab-invoices-customers/tab-invoices-customers.component';

const routes: Routes = [

   { path: '', component: TabInvoicesComponent }];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class TabInvoicesRoutingModule { }
