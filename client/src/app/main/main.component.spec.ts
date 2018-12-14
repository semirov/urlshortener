import { ComponentFixture, TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ValidatorsService } from '../core/services/validators.service';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AppModule } from '../app.module';
import { iif, of, Observable } from 'rxjs';
import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { BackendApiService } from '../core/services/backend-api.service';
import { By } from '@angular/platform-browser';
import { ClipboardService } from 'ngx-clipboard';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';




describe('MainComponent', () => {

    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;
    let validatorsService: ValidatorsService;
    let backendApiService: BackendApiService;
    const asyncUrlValidator: any = (control): Observable<{ [key: string]: any } | null> => {
        return of({ 'urlNotExist': true });
    };
    function asyncShortUrlExistValidator(control) {
        return of({ 'shortUrlExist': true });
    }
    function noErrorAsyncValidator(control) {
        return of(null);
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainComponent],
            imports: [
                CoreModule,
                SharedModule,
                RouterTestingModule,
            ],
            providers: [
                ValidatorsService,
                BackendApiService,
                ClipboardService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        validatorsService = TestBed.get(ValidatorsService);
        backendApiService = TestBed.get(BackendApiService);
        component.ngOnInit();
    });

    it('should be component created...', () => {
        expect(component).toBeTruthy();
    });

    it('should be form created...', () => {
        expect(component.mainForm).toBeTruthy();
    });

    it('Form invalid when empty...', () => {
        expect(component.mainForm.valid).toBeFalsy();
    });

    it('should behave component const init...', () => {
        expect(component.urlFieldVisible).toBeTruthy();
        expect(component.generateResultVisible).toBeFalsy();
        expect(component.shortUrl).toBe('');
    });

    it('should behave isFieldInvalid get true or false if error and no error...', () => {
        expect(component.isFieldInvalid('url')).toBeTruthy();
        component.mainForm.patchValue({ url: 'ya.ru' });
        expect(component.isFieldInvalid('url')).toBeFalsy();
    });

    it('should be getErrorMessage get errors messages...', () => {
        component.mainForm.patchValue({ url: undefined });
        expect(component.getErrorMessage('url')).toBe('Field is required..');
        component.mainForm.patchValue({ url: 'http://qweqw3213.com' });
        expect(component.getErrorMessage('url')).toBe('');
        component.mainForm.patchValue({ url: 'qweqwe' });
        expect(component.getErrorMessage('url')).toBe('Url has the wrong format ..');
        component.mainForm.patchValue({ short: ' ' });
        expect(component.getErrorMessage('short')).toBe('Whitespaces are not allowed..');
        component.mainForm.patchValue({ short: 'qwe/qwe' });
        expect(component.getErrorMessage('short')).toBe('Please, only words, numbers and underscore..');
    });

    it('should behave getErrorMessage get errors messages with async validator...', async(() => {
        spyOn(validatorsService, 'urlValidator').and.returnValue(asyncUrlValidator);
        spyOn(validatorsService, 'customLinkExistValidator').and.returnValue(asyncShortUrlExistValidator);
        fixture.detectChanges();
        component.mainForm.patchValue({ url: 'http://qweqw3213.com', short: 'test' });
        fixture.whenStable().then(() => {
            expect(component.getErrorMessage('url')).toBe('We checked, this url does not exist, we are sorry..');
            expect(component.getErrorMessage('short')).toBe('Link already in use, try another..');
        });
    }));

    it('should be generate short link...', async(() => {
        spyOn(backendApiService, 'generateShortUrl').and.returnValue(of({ shortUrl: 'testValue' }));
        spyOn(component, 'isFieldInvalid').and.returnValue(false);
        spyOn(validatorsService, 'urlValidator').and.returnValue(asyncUrlValidator);
        component.mainForm.patchValue({ url: 'google.com' });
        fixture.detectChanges();
        component.onClickGenerate();
        fixture.whenStable().then(() => {
            expect(component.shortUrl).toBe('testValue');
            expect(component.generateResultVisible).toBeTruthy();
            expect(component.customUrlVisible).toBeFalsy();
            expect(component.urlFieldVisible).toBeFalsy();
            fixture.detectChanges();
            const resultElement = fixture.debugElement.query(By.css('.copy-clipboard')).nativeElement;
            expect(resultElement.textContent).toContain('testValue');
        });
    }));

    it('should be change to generate custom...', async(() => {
        spyOn(validatorsService, 'customLinkExistValidator').and.returnValue(noErrorAsyncValidator);
        spyOn(backendApiService, 'generateShortUrl').and.returnValue(of({ shortUrl: 'testValue' }));
        spyOn(component, 'isFieldInvalid').and.returnValue(false);
        fixture.detectChanges();
        component.mainForm.patchValue({ short: 'testShort' });
        component.onClickCustomButton();
        expect(component.customUrlVisible).toBeTruthy();
        expect(component.urlFieldVisible).toBeFalsy();
        component.onClickGenerateCustom();
        fixture.detectChanges();
        const resultElement = fixture.debugElement.query(By.css('.copy-clipboard'));
        expect(resultElement.nativeElement.textContent).toContain('testValue');
        const ngbTooltip = fixture.debugElement.query(By.directive(NgbTooltip));
        const directiveInstance = ngbTooltip.injector.get(NgbTooltip);
        expect(directiveInstance).toBeDefined();
        directiveInstance.open();
        component.onClickLink(directiveInstance);
    }));

    it('should be componet restarted', () => {
        component.hideResultAndRestart();
        expect(component.generateResultVisible).toBeFalsy();
        component.onClickRestartAfterAnimation({toState: 'void'});
        fixture.detectChanges();
        expect(component.mainComponentVisible).toBeTruthy();
        expect(component.urlFieldVisible).toBeTruthy();
        expect(component.customUrlVisible).toBeFalsy();
        expect(component.generateResultVisible).toBeFalsy();
    });


});



