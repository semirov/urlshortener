import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { throwIfAlreadyLoaded } from './guard/module-import-guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BackendApiService } from './services/backend-api.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule.forRoot(),
  ],
  providers: [
    BackendApiService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

