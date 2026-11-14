import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { FavoritesComponent } from './favorites.component';
import { FavoritesService } from './favorites.service';
import { Product } from './product';
import { productA, productB } from './testing';

describe('FavoritesComponent', () => {
  let fixture: ComponentFixture<FavoritesComponent>;
  let element: HTMLElement;
  let items: WritableSignal<Product[]>;
  let favoritesMock: { favorites: WritableSignal<Product[]>; remove: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    items = signal<Product[]>([]);
    favoritesMock = { favorites: items, remove: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [{ provide: FavoritesService, useValue: favoritesMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('повинен показати повідомлення, коли вибране порожнє', () => {
    expect(element.textContent).toContain('Поки що нічого не додано');
    expect(element.querySelector('h2')?.textContent).toContain('(0)');
  });

  it('повинен відобразити всі вибрані продукти', () => {
    items.set([productA, productB]);
    fixture.detectChanges();

    expect(element.querySelectorAll('mat-list-item')).toHaveLength(2);
    expect(element.textContent).toContain('T-Shirt');
    expect(element.querySelector('h2')?.textContent).toContain('(2)');
  });

  it('повинен викликати remove() при натисканні кнопки видалення', () => {
    items.set([productA]);
    fixture.detectChanges();

    element.querySelector<HTMLButtonElement>('mat-list-item button')?.click();

    expect(favoritesMock.remove).toHaveBeenCalledTimes(1);
    expect(favoritesMock.remove).toHaveBeenCalledWith(productA);
  });
});