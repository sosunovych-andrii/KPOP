import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product';

@Injectable({ providedIn: 'root' })
export class FavoritesStore {
  private readonly subject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  public readonly favorites$: Observable<Product[]> = this.subject.asObservable();

  public has(product: Product): boolean {
    return this.subject.value.some((p: Product): boolean => p.id === product.id);
  }

  public toggle(product: Product): void {
    if (this.has(product)) {
      this.remove(product);
    } else {
      this.subject.next([...this.subject.value, product]);
    }
  }

  public remove(product: Product): void {
    this.subject.next(this.subject.value.filter((p: Product): boolean => p.id !== product.id));
  }
}