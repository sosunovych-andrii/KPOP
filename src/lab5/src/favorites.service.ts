import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Product } from './product';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly items: WritableSignal<Product[]> = signal<Product[]>([]);

  public readonly favorites: Signal<Product[]> = this.items.asReadonly();

  public has(product: Product): boolean {
    return this.items().some((p: Product): boolean => p.id === product.id);
  }

  public toggle(product: Product): void {
    if (this.has(product)) {
      this.remove(product);
    } else {
      this.items.update((list: Product[]): Product[] => [...list, product]);
    }
  }

  public remove(product: Product): void {
    this.items.update((list: Product[]): Product[] => list.filter((p: Product): boolean => p.id !== product.id));
  }
}