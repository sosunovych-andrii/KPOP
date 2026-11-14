import { Component, Input } from '@angular/core';

@Component({
  selector: 'child-comp',
  standalone: true,
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
})
export class ChildComponent {
  @Input() public a: number | null = null;
  @Input() public b: number | null = null;
  @Input() public c: number | null = null;

  public get error(): string | null {
    if (!this.isNumber(this.a) || !this.isNumber(this.b) || !this.isNumber(this.c)) {
      return 'Введіть усі коефіцієнти числами';
    }
    if (this.a === 0) {
      return 'Коефіцієнт a не може дорівнювати 0';
    }
    return null;
  }

  public get discriminant(): number {
    const a: number = this.a ?? 0;
    const b: number = this.b ?? 0;
    const c: number = this.c ?? 0;
    return b * b - 4 * a * c;
  }

  public get roots(): number[] {
    const a: number = this.a ?? 0;
    const b: number = this.b ?? 0;
    const d: number = this.discriminant;
    if (d < 0) {
      return [];
    }
    if (d === 0) {
      return [-b / (2 * a)];
    }
    const sqrtD: number = Math.sqrt(d);
    return [(-b + sqrtD) / (2 * a), (-b - sqrtD) / (2 * a)];
  }

  private isNumber(value: number | null): value is number {
    return typeof value === 'number' && Number.isFinite(value);
  }
}