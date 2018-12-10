import { Component } from '@angular/core';
import { enterLeave } from './shared/animation/enterLeave';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [enterLeave]
})
export class AppComponent {}
