import { BackendApiService } from './backend-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { DefaultErrorHandler } from './default-error-handler.service';



describe('backend-api.service', () => {
    let service: BackendApiService;
    let httpMock: HttpTestingController;
    let baseApiUrl: string;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                BackendApiService,
                DefaultErrorHandler
            ]

        });
        baseApiUrl = environment.baseApiUrl;
        service = TestBed.get(BackendApiService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('The instance must be created.', () => {
        expect(service).toBeDefined();
    });


    it('Short URL should be created', () => {
        const fakeUrl = 'ya.ru';
        const fakeShortName = 'test';
        const fakeShortUrl = 'test.te/test';

        service.generateShortUrl(fakeUrl, fakeShortName).subscribe(
            (data: any) => {
                expect(data.fullUrl).toBe(fakeUrl);
                expect(data.shortUrl).toBe(fakeShortUrl);
            }
        );

        const req = httpMock.expectOne(`${baseApiUrl}/generateShortUrl`, 'call to generateShortUrl');
        expect(req.request.method).toBe('POST');

        req.flush({
            fullUrl: fakeUrl,
            shortUrl: fakeShortUrl,
        });
        httpMock.verify();
    });

    it('Should be to check the existence ...', () => {
        const fakeShortName = 'test';
        const queryString = `?shortUrl=${encodeURIComponent(fakeShortName)}`;
        service.isShortUrlExist(fakeShortName).subscribe(
            (data: any) => {
                expect(data.result).toBeTruthy();
            }
        );

        const req = httpMock.expectOne(`${baseApiUrl}/existShortUrl${queryString}`, 'call to existShortUrl');
        expect(req.request.method).toBe('GET');

        req.flush({result: true});
        httpMock.verify();
    });

    it('should be check get all records...', () => {
        service.getAll().subscribe(
            (data: any) => {
                expect(data.result).toBeTruthy();
            }
        );

        const req = httpMock.expectOne(`${baseApiUrl}/all`, 'call to all');
        expect(req.request.method).toBe('GET');

        req.flush({result: true});
        httpMock.verify();
    });

    it('should be check get redirect url...', () => {
        const path = 'test';
        service.redirectUrl(path).subscribe(
            (data: any) => {
                expect(data.result).toBeTruthy();
            }
        );

        const req = httpMock.expectOne(`${baseApiUrl}/redirectUrl/${path}`, 'call to all');
        expect(req.request.method).toBe('GET');

        req.flush({result: true});
        httpMock.verify();
    });

});


