import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { M3OdinModule } from '@infor-up/m3-odin-angular';
import { SohoComponentsModule } from 'ids-enterprise-ng';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
   declarations: [
   ],

   imports: [
      CommonModule,
      SohoComponentsModule,
      M3OdinModule,
      FormsModule,
      RouterModule
   ],

   exports: [
      CommonModule,
      SohoComponentsModule,
      M3OdinModule,
      FormsModule,
      RouterModule
   ]
})
export class SharedModule { }
