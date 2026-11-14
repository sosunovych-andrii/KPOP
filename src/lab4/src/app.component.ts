import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public a: number | null = 1;
  public b: number | null = -3;
  public c: number | null = 2;
}