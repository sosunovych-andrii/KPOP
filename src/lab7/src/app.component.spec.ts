import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { ProductService } from './product.service';
import { createStorageMock } from './testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ProductService, useValue: { getProducts: vi.fn().mockResolvedValue([]) } },
        { provide: Storage, useValue: createStorageMock() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('повинен створюватися', () => {
    expect(fixture.componentInstance).toBeDefined();
  });

  it('повинен відобразити заголовок у тулбарі', () => {
    expect(element.querySelector('mat-toolbar')?.textContent).toMatch(/Fake Store/);
  });

  it('повинен підключати таблицю продуктів і вибране', () => {
    expect(element.querySelector('app-product-table')).not.toBeNull();
    expect(element.querySelector('app-favorites')).toBeTruthy();
  });
});