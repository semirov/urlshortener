import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { throwIfAlreadyLoaded } from './guard/module-import-guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BackendApiService } from './services/backend-api.service';
import { DefaultErrorHandler } from './services/default-error-handler.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    BackendApiService,
    DefaultErrorHandler
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

