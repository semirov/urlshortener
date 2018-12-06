
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { BackendApiService } from '../services/backend-api.service';

@Injectable()
export class RouteGuard implements CanActivate {

  constructor(
      private router: Router,
      private backendApiService: BackendApiService,
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      this.backendApiService.checkRedirect(state.url.substring(1)).subscribe(
        res => console.log(res)
      );
      console.log(route);
      console.log(state);
    // this.backendApiService.checkRedirect()
    // this.router.navigate(['/login']);
    return true;
  }
}
