import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BackendApiService } from './backend-api.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor(
    private backendApiService: BackendApiService
  ) { }

  public urlValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      const controlValue = control.value.toString();
      return new Observable((observer) => {
        if (!this.isUrlValid(controlValue)) {
          observer.next({ 'urlNotValid': true });
          observer.complete();
        } else {
          this.backendApiService.isUrlExist(controlValue).subscribe(
            isValid => {
              observer.next(isValid ? null : { 'urlNotExist': true });
              observer.complete();
            },
            err => {
              observer.next({ 'urlNotExist': true });
              observer.complete();
            },
          );
        }
      });
    };
  }

  public customLinkExistValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      const controlValue = control.value.toString();
      return new Observable((observer) => {
        if (controlValue === '') {
          observer.next(null);
          observer.complete();
        } else if (this.isProtectedName(controlValue) || this.isNotWordOrDigit(controlValue)) {
          observer.next({ 'invalidShortUrl': true });
          observer.complete();
        } else  {
          this.backendApiService.isShortUrlExist(controlValue).subscribe(
            value => {
              observer.next(value ? { 'shortUrlExist': true } : null);
              observer.complete();
            },
            err => {
              observer.next({ 'shortUrlExist': true });
              observer.complete();
            },
          );
        }
      });
    };
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = /\s/g.test(control.value || '');
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}

  private isProtectedName(link: string): boolean {
    if (/^(api|https?)/i.test(link)) {
      return true;
    }
    return false;
  }

  private isNotWordOrDigit(link: string): boolean {
    if (/[\W]+/i.test(link)) {
      return true;
    }
    return false;
  }



  private isUrlValid(value): boolean {
    // tslint:disable-next-line:max-line-length
    const regExp = /((([0-9a-z_-]+\.)+(aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mn|mo|mp|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|nom|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ra|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw|arpa)(:[0-9]+)?((\/([~0-9a-zA-Z\#\+\%@\.\/_-]+))?(\?[0-9a-zA-Z\+\%@\/&\[\];=_-]+)?)?))\b/i;
    return regExp.test(value);
  }
}

