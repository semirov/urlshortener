import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { filterQueryId } from '@angular/core/src/view/util';
import { DefaultErrorHandler } from './default-error-handler.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  private baseApiUrl = environment.baseApiUrl;

  constructor(
    private http: HttpClient,
    private errorHandler: DefaultErrorHandler,
  ) {}

  private request(
    method: string,
    url: string,
    postBody: any = {},
    urlParams: any = {}
  ): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let queryString = '';

    if (urlParams.shortUrl) {
      queryString = `?shortUrl=${encodeURIComponent(urlParams.shortUrl)}`;
    }
    const request = new HttpRequest(method, `${url}${queryString}`, postBody, { headers });
    return this.http.request(request).pipe(
      filter(event => event instanceof HttpResponse),
      map((res: HttpResponse<any>) => res.body),
      catchError(err => this.errorHandler.handleError(err))
    );
  }

  generateShortUrl(url: string, shortUrl?: string): Observable<any> {
    return this.request('POST', `${this.baseApiUrl}/generateShortUrl`, {url, shortUrl});
  }

  isShortUrlExist(shortUrl: string): Observable<boolean> {
    return this.request('GET', `${this.baseApiUrl}/existShortUrl`, undefined, { shortUrl });

  }

  getAll(): Observable<any> {
    return this.request('GET', `${this.baseApiUrl}/all`);
  }

  isUrlExist(url: string): Observable<any> {
    return this.request('POST', `${this.baseApiUrl}/validateUrl`, {url});
  }

}
