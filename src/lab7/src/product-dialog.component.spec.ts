import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog.component';
import { FavoritesService } from './favorites.service';
import { productA } from './testing';

describe('ProductDialogComponent', () => {
  const favoritesMock = { has: vi.fn<() => boolean>(), toggle: vi.fn() };

  async function render(isFavorite: boolean): Promise<HTMLElement> {
    favoritesMock.has.mockReturnValue(isFavorite);
    await TestBed.configureTestingModule({
      imports: [ProductDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: productA },
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
        { provide: FavoritesService, useValue: favoritesMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductDialogComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  beforeEach(() => {
    favoritesMock.has.mockReset();
    favoritesMock.toggle.mockReset();
  });

  it('повинен показати повну інформацію про продукт', async () => {
    const element = await render(false);

    expect(element.querySelector('h2')?.textContent).toBe('Backpack');
    expect(element.textContent).toContain("men's clothing");
    expect(element.textContent).toContain('$109.95');
    expect(element.textContent).toContain('3.9');
  });

  it('повинен пропонувати додати продукт, якщо його немає у вибраному', async () => {
    const element = await render(false);

    expect(element.querySelector('button')?.textContent).toContain('Додати у вибране');
  });

  it('повинен пропонувати прибрати продукт, якщо він вже у вибраному', async () => {
    const element = await render(true);

    expect(element.querySelector('button')?.textContent).toContain('Прибрати з вибраного');
  });

  it('повинен викликати toggle() при натисканні кнопки', async () => {
    const element = await render(false);

    element.querySelector<HTMLButtonElement>('button')?.click();

    expect(favoritesMock.toggle).toHaveBeenCalledWith(productA);
  });
});