import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from './product';
import { FavoritesStore } from './favorites.store';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [CurrencyPipe, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>{{ product.title }}</h2>
    <mat-dialog-content>
      <img [src]="product.image" [alt]="product.title" />
      <p><b>Категорія:</b> {{ product.category }}</p>
      <p><b>Ціна:</b> {{ product.price | currency }}</p>
      <p><b>Рейтинг:</b> {{ product.rating }} ({{ product.reviews }} відгуків)</p>
      <p><b>Опис:</b> {{ product.description }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-stroked-button (click)="favorites.toggle(product)">
        <mat-icon>{{ favorites.has(product) ? 'star' : 'star_border' }}</mat-icon>
        {{ favorites.has(product) ? 'Прибрати з вибраного' : 'Додати у вибране' }}
      </button>
      <button mat-flat-button mat-dialog-close>Закрити</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      img {
        display: block;
        max-width: 100%;
        max-height: 240px;
        margin: 0 auto 16px;
      }
    `,
  ],
})
export class ProductDialogComponent {
  protected readonly product: Product = inject<Product>(MAT_DIALOG_DATA);
  protected readonly favorites: FavoritesStore = inject(FavoritesStore);
}