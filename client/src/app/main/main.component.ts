import { Component, OnInit } from '@angular/core';
import { ValidatorsService } from '../core/services/validators.service';
import { BackendApiService } from '../core/services/backend-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  mainForm: FormGroup;

  constructor(
    private validatorsService: ValidatorsService,
    private backendApiService: BackendApiService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
  }


  private createForm() {
    this.mainForm = this.fb.group({
      url: [undefined, Validators.required,  this.validatorsService.urlValidator() ],
      short: [{ value: '', disabled: true }, undefined, this.validatorsService.customLinkExistValidator()],
      generatedLink: [{ value: '', disabled: true }],
    });
  }
}
