import { Component, OnInit } from '@angular/core';
import { ValidatorsService } from '../core/services/validators.service';
import { BackendApiService } from '../core/services/backend-api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { enterLeave, enterDelay3sec, leave } from '../shared/animation/enterLeave';
import { PlatformLocation } from '@angular/common';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [enterLeave, enterDelay3sec, leave]
})
export class MainComponent implements OnInit {

  mainForm: FormGroup;
  urlFieldVisible = true;
  customUrlVisible = false;
  generateResultVisible = false;
  mainComponentVisible = true;
  isInvalid = true;
  currentUrl = '';
  shortUrl = '';

  constructor(
    private validatorsService: ValidatorsService,
    private backendApiService: BackendApiService,
    private fb: FormBuilder,
    private platformLocation: PlatformLocation,
    private clipboardService: ClipboardService
  ) { }

  ngOnInit() {
    this.createForm();
    this.mainComponentVisible = true;
    this.urlFieldVisible = true;
    this.customUrlVisible = false;
    this.generateResultVisible = false;
    this.currentUrl = (this.platformLocation as any).location.href;
  }


  private createForm() {
    this.mainForm = this.fb.group({
      url: ['',
        [
          Validators.required,
          this.validatorsService.noWhitespaceValidator
        ],
        this.validatorsService.urlValidator()
      ],
      short: ['',
        this.validatorsService.noWhitespaceValidator,
        this.validatorsService.customLinkExistValidator()
      ],
    });
  }

  isFieldInvalid(fieldName: string) {
    const errors = this.mainForm.get(fieldName).errors;
    const isError = errors ? true : false;
    return isError;
  }

  getErrorMessage(fieldName: string) {
    const errors = this.mainForm.get(fieldName).errors;
    if (errors && errors['required']) { return 'Field is required..'; }
    if (errors && errors['urlNotValid']) { return 'Url has the wrong format ..'; }
    if (errors && errors['urlNotExist']) { return 'We checked, this url does not exist, we are sorry..'; }
    if (errors && errors['shortUrlExist']) { return 'Link already in use, try another..'; }
    if (errors && errors['invalidShortUrl']) { return 'Please, only words, numbers and underscore..'; }
    if (errors && errors['whitespace']) { return 'Whitespaces are not allowed..'; }
    return 'Something is wrong...';
  }

  onClickGenerate() {
    if (!this.isFieldInvalid('url')) {
      this.backendApiService.generateShortUrl(this.mainForm.value.url).subscribe(
        res => {
          this.shortUrl = res.shortUrl;
          this.generateResultVisible = true;
          this.customUrlVisible = false;
          this.urlFieldVisible = false;
        }
      );
    }
  }

  onClickCustomButton() {
    this.urlFieldVisible = false;
    this.customUrlVisible = true;
  }

  onClickRestartAfterAnimation($event) {
    if ($event.toState === 'void') {
      this.ngOnInit();
    }
  }

  hideResultAndRestart() {
    this.generateResultVisible = false;
  }

  onClickGenerateCustom() {
    if (!this.isFieldInvalid('short')) {
      this.backendApiService.generateShortUrl(this.mainForm.value.url, this.mainForm.value.short).subscribe(
        res => {
          this.shortUrl = res.shortUrl;
          this.generateResultVisible = true;
          this.customUrlVisible = false;
          this.urlFieldVisible = false;
        }
      );
    }

  }

  onClickLink(tooltip) {
    if (tooltip.isOpen()) {
      tooltip.close();
    }
    this.clipboardService.copyFromContent(this.shortUrl);
    tooltip.open({ tipMessage: 'Copied!' });
  }



}
