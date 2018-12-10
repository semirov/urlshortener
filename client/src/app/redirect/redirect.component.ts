import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { enterDelay3sec } from '../shared/animation/enterLeave';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
  animations: [enterDelay3sec]
})
export class RedirectComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  comeBack() {
    this.location.back();
  }

  navigateToMain() {
    this.router.navigate(['/']);

  }

}
