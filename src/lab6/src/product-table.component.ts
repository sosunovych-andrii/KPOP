import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product } from './product';
import { ProductService } from './product.service';
import { FavoritesService } from './favorites.service';
import { ProductDialogComponent } from './product-dialog.component';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CurrencyPipe, MatTableModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    @if (loading()) {
      <mat-spinner diameter="48" />
    } @else if (error(); as message) {
      <p class="error">{{ message }}</p>
      <button mat-flat-button (click)="load()">Спробувати ще раз</button>
    } @else {
      <table mat-table [dataSource]="products()">
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef>Назва</th>
          <td mat-cell *matCellDef="let p">{{ p.title }}</td>
        </ng-container>
        <ng-container matColumnDef="category">
          <th mat-header-cell *matHeaderCellDef>Категорія</th>
          <td mat-cell *matCellDef="let p">{{ p.category }}</td>
        </ng-container>
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Опис</th>
          <td mat-cell *matCellDef="let p" class="description">{{ p.description }}</td>
        </ng-container>
        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef>Ціна</th>
          <td mat-cell *matCellDef="let p">{{ p.price | currency }}</td>
        </ng-container>
        <ng-container matColumnDef="favorite">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let p">
            <button mat-icon-button (click)="toggleFavorite($event, p)">
              <mat-icon>{{ favorites.has(p) ? 'star' : 'star_border' }}</mat-icon>
            </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let p; columns: columns" (click)="open(p)"></tr>
      </table>
    }
  `,
  styles: [
    `
      table {
        width: 100%;
      }
      tr.mat-mdc-row {
        cursor: pointer;
      }
      tr.mat-mdc-row:hover {
        background: rgba(0, 0, 0, 0.04);
      }
      .description {
        max-width: 360px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .error {
        color: #dc2626;
      }
    `,
  ],
})
export class ProductTableComponent implements OnInit {
  private readonly service: ProductService = inject(ProductService);
  private readonly dialog: MatDialog = inject(MatDialog);
  protected readonly favorites: FavoritesService = inject(FavoritesService);

  protected readonly columns: string[] = ['title', 'category', 'description', 'price', 'favorite'];
  protected readonly products: WritableSignal<Product[]> = signal<Product[]>([]);
  protected readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly error: WritableSignal<string | null> = signal<string | null>(null);

  public ngOnInit(): void {
    void this.load();
  }

  protected async load(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      this.products.set(await this.service.getProducts());
    } catch (e: unknown) {
      this.error.set(`Не вдалося завантажити продукти: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      this.loading.set(false);
    }
  }

  protected open(product: Product): void {
    this.dialog.open(ProductDialogComponent, { data: product, width: '560px' });
  }

  protected toggleFavorite(event: MouseEvent, product: Product): void {
    event.stopPropagation();
    void this.favorites.toggle(product);
  }
}