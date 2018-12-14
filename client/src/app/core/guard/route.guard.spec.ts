import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
import { RouteGuard } from './route.guard';
import { BackendApiService } from '../services/backend-api.service';
import { CoreModule } from '../core.module';
import { SharedModule } from '../../shared/shared.module';
import { of } from 'rxjs';


describe('RouteGuard', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CoreModule,
                SharedModule,
                RouterTestingModule
            ],
            providers: [
                RouteGuard,
                BackendApiService
            ],
        });
    });

    it('The router must allow navigation if redirection is not found.',

        // inject your guard service AND Router
        async(inject([RouteGuard, Router, BackendApiService],
            (guard: RouteGuard, router, backendApiService: BackendApiService) => {

                spyOn(backendApiService, 'redirectUrl').and.returnValue(of(false));
                const fakeRouterStateSnapshot = { url: 'testUrl' } as RouterStateSnapshot;
                spyOn(router, 'navigate');
                guard.canActivate(null, fakeRouterStateSnapshot).subscribe(
                    result => expect(result).toBeTruthy()
                );
            })
        ));
});
