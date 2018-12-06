
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { BackendApiService } from '../services/backend-api.service';
import { Location } from '@angular/common';

@Injectable()
export class RouteGuard implements CanActivate {

  constructor(
      private router: Router,
      private backendApiService: BackendApiService,
      private location: Location
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      this.backendApiService.redirectUrl(state.url.substring(1)).subscribe(
        res => {
          if (res) {
            window.location.href = res.fullUrl;
            this.router.navigate(['redirection']);
          }
        }
      );
      console.log(state);
    return true;
  }
}
