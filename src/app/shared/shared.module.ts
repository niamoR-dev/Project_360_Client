import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { M3OdinModule } from '@infor-up/m3-odin-angular';
import { SohoComponentsModule } from 'ids-enterprise-ng';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const Modules = [
   CommonModule,
   SohoComponentsModule,
   M3OdinModule,
   FormsModule,
   RouterModule,
   ReactiveFormsModule
]

const Components = [

]


@NgModule({
   declarations: [
      ...Components
   ],

   imports: [
      ...Modules,

   ],

   exports: [
      ...Modules,
      ...Components
   ]
})
export class SharedModule { }
