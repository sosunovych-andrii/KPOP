import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesService } from './favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CurrencyPipe, MatListModule, MatButtonModule, MatIconModule],
  template: `
    <h2>Вибране ({{ favorites.favorites().length }})</h2>
    <mat-list>
      @for (p of favorites.favorites(); track p.id) {
        <mat-list-item>
          <span matListItemTitle>{{ p.title }}</span>
          <span matListItemLine>{{ p.category }} · {{ p.price | currency }}</span>
          <button mat-icon-button matListItemMeta (click)="favorites.remove(p)">
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
  protected readonly favorites: FavoritesService = inject(FavoritesService);
}