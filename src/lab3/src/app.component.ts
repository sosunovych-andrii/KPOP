import { Component } from '@angular/core';
import { CircleCalculatorComponent } from './circle-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CircleCalculatorComponent],
  template: `
    <h1>Практична робота №3</h1>
    <app-circle-calculator />
  `,
})
export class AppComponent {}