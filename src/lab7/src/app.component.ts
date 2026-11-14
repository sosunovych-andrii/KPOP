import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductTableComponent } from './product-table.component';
import { FavoritesComponent } from './favorites.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, ProductTableComponent, FavoritesComponent],
  template: `
    <mat-toolbar>Fake Store — продукти</mat-toolbar>
    <main>
      <app-product-table />
      <app-favorites />
    </main>
  `,
  styles: [
    `
      main {
        display: grid;
        grid-template-columns: 1fr 320px;
        gap: 24px;
        padding: 16px;
      }
      @media (max-width: 900px) {
        main {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class AppComponent {}