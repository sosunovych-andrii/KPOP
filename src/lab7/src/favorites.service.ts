import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Product } from './product';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private static readonly key: string = 'favorites';

  private readonly storage: Storage = inject(Storage);
  private readonly ready: Promise<Storage> = this.init();
  private readonly items: WritableSignal<Product[]> = signal<Product[]>([]);

  public readonly favorites: Signal<Product[]> = this.items.asReadonly();

  public has(product: Product): boolean {
    return this.items().some((p: Product): boolean => p.id === product.id);
  }

  public async toggle(product: Product): Promise<void> {
    if (this.has(product)) {
      await this.remove(product);
    } else {
      await this.save([...this.items(), product]);
    }
  }

  public async remove(product: Product): Promise<void> {
    await this.save(this.items().filter((p: Product): boolean => p.id !== product.id));
  }

  private async init(): Promise<Storage> {
    const storage: Storage = await this.storage.create();
    const saved: unknown = await storage.get(FavoritesService.key);
    if (Array.isArray(saved)) {
      this.items.set(saved as Product[]);
    }
    return storage;
  }

  private async save(list: Product[]): Promise<void> {
    const storage: Storage = await this.ready;
    await storage.set(FavoritesService.key, list);
    this.items.set(list);
  }
}