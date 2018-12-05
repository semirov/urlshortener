import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DefaultErrorHandler {
  public handleError(errorResponse: HttpErrorResponse): Observable<any> {
    return throwError('Server error! ' + 'Code: ' + errorResponse.status);
  }
}
