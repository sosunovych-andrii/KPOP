import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Storage } from '@ionic/storage-angular';
import { ProductTableComponent } from './product-table.component';
import { ProductService } from './product.service';
import { FavoritesService } from './favorites.service';
import { ProductDialogComponent } from './product-dialog.component';
import { createStorageMock, productA, productB } from './testing';
import { Product } from './product';

describe('ProductTableComponent', () => {
  let fixture: ComponentFixture<ProductTableComponent>;
  let component: ProductTableComponent;
  let element: HTMLElement;
  const productServiceMock = { getProducts: vi.fn<() => Promise<Product[]>>() };
  const dialogMock = { open: vi.fn() };

  async function render(): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [ProductTableComponent],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: Storage, useValue: createStorageMock() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  beforeEach(() => {
    productServiceMock.getProducts.mockReset();
    dialogMock.open.mockReset();
  });

  it('повинен створюватися', async () => {
    productServiceMock.getProducts.mockResolvedValue([]);
    await render();

    expect(component).toBeTruthy();
  });

  it('повинен завантажити продукти при ініціалізації', async () => {
    productServiceMock.getProducts.mockResolvedValue([productA, productB]);
    await render();

    expect(productServiceMock.getProducts).toHaveBeenCalled();
    expect(component['products']()).toEqual([productA, productB]);
  });

  it('повинен відобразити рядок таблиці для кожного продукту', async () => {
    productServiceMock.getProducts.mockResolvedValue([productA, productB]);
    await render();

    const rows: NodeListOf<HTMLElement> = element.querySelectorAll('tr.mat-mdc-row');
    expect(rows).toHaveLength(2);
    expect(rows[0].textContent).toContain('Backpack');
    expect(rows[1].textContent).toMatch(/T-Shirt/);
  });

  it('повинен показати помилку, якщо завантаження не вдалося', async () => {
    productServiceMock.getProducts.mockRejectedValue(new Error('Network Error'));
    await render();

    expect(component['error']()).toContain('Network Error');
    expect(element.querySelector('.error')?.textContent).toContain('Не вдалося завантажити продукти');
  });

  it('повинен вимкнути індикатор завантаження після отримання даних', async () => {
    productServiceMock.getProducts.mockResolvedValue([productA]);
    await render();

    expect(component['loading']()).toBe(false);
    expect(element.querySelector('mat-spinner')).toBeNull();
  });

  it('повинен повторно завантажити дані при натисканні "Спробувати ще раз"', async () => {
    productServiceMock.getProducts.mockRejectedValueOnce(new Error('fail')).mockResolvedValueOnce([productA]);
    await render();

    const retry: HTMLButtonElement | null = element.querySelector('button');
    retry?.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(productServiceMock.getProducts).toHaveBeenCalledTimes(2);
    expect(component['error']()).toBeNull();
  });

  it('повинен відкрити попап з продуктом при кліку на рядок', async () => {
    productServiceMock.getProducts.mockResolvedValue([productA]);
    await render();

    element.querySelector<HTMLElement>('tr.mat-mdc-row')?.click();

    expect(dialogMock.open).toHaveBeenCalledWith(ProductDialogComponent, { data: productA, width: '560px' });
  });

  it('повинен додати у вибране по кліку на зірочку без відкриття попапу', async () => {
    productServiceMock.getProducts.mockResolvedValue([productA]);
    await render();
    const favorites: FavoritesService = TestBed.inject(FavoritesService);
    const toggleSpy = vi.spyOn(favorites, 'toggle');

    element.querySelector<HTMLButtonElement>('tr.mat-mdc-row button')?.click();

    expect(toggleSpy).toHaveBeenCalledWith(productA);
    expect(dialogMock.open).not.toHaveBeenCalled();
  });
});