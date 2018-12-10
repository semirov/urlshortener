import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { enterDelay3sec } from '../shared/animation/enterLeave';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  animations: [enterDelay3sec]
})
export class NotFoundComponent implements OnInit {

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
