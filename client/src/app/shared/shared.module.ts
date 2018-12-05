import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
