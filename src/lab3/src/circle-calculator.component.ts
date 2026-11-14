import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CircleResult {
  circumference: number;
  area: number;
  volume: number;
}

@Component({
  selector: 'app-circle-calculator',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  template: `
    <h2>Коло, круг і куля</h2>
    <input type="number" min="0" [(ngModel)]="radius" placeholder="Радіус" />
    @if (result(); as r) {
      <p>Довжина кола: {{ r.circumference | number: '1.0-4' }}</p>
      <p>Площа круга: {{ r.area | number: '1.0-4' }}</p>
      <p>Об'єм кулі: {{ r.volume | number: '1.0-4' }}</p>
    } @else {
      <p class="error">Радіус має бути невідʼємним числом</p>
    }
  `,
})
export class CircleCalculatorComponent {
  public readonly radius: WritableSignal<number | null> = signal<number | null>(1);

  public readonly result: Signal<CircleResult | null> = computed((): CircleResult | null => {
    const r: number | null = this.radius();
    if (r === null || !Number.isFinite(r) || r < 0) {
      return null;
    }
    return {
      circumference: 2 * Math.PI * r,
      area: Math.PI * r ** 2,
      volume: (4 / 3) * Math.PI * r ** 3,
    };
  });
}