import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesStore } from './favorites.store';
import { Product } from './product';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, MatListModule, MatButtonModule, MatIconModule],
  template: `
    @let list = (favorites$ | async) ?? [];
    <h2>Вибране ({{ list.length }})</h2>
    <mat-list>
      @for (p of list; track p.id) {
        <mat-list-item>
          <span matListItemTitle>{{ p.title }}</span>
          <span matListItemLine>{{ p.category }} · {{ p.price | currency }}</span>
          <button mat-icon-button matListItemMeta (click)="store.remove(p)">
            <mat-icon>delete</mat-icon>
          </button>
        </mat-list-item>
      } @empty {
        <p>Поки що нічого не додано</p>
      }
    </mat-list>
  `,
})
export class FavoritesComponent {
  protected readonly store: FavoritesStore = inject(FavoritesStore);
  protected readonly favorites$: Observable<Product[]> = this.store.favorites$;
}