import { TestBed } from '@angular/core/testing';
import { AxiosInstance } from 'axios';
import { ProductService } from './product.service';
import { productA, productB } from './testing';

describe('ProductService', () => {
  let service: ProductService;
  let getSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
    const http: AxiosInstance = service['http'];
    getSpy = vi.spyOn(http, 'get');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('повинен створюватися як singleton сервіс', () => {
    expect(service).toBeTruthy();
    expect(TestBed.inject(ProductService)).toBe(service);
  });

  it('повинен робити GET запит на /products', async () => {
    getSpy.mockResolvedValue({ data: [productA] });

    await service.getProducts();

    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith('/products');
  });

  it('повинен повертати список продуктів з відповіді API', async () => {
    getSpy.mockResolvedValue({ data: [productA, productB] });

    const products = await service.getProducts();

    expect(products).toHaveLength(2);
    expect(products).toEqual([productA, productB]);
  });

  it('повинен відкидати елементи з некоректною структурою', async () => {
    getSpy.mockResolvedValue({ data: [productA, { id: 'x' }, null, 42, productB] });

    const products = await service.getProducts();

    expect(products).toEqual([productA, productB]);
    expect(products).not.toContain(null);
  });

  it('повинен кидати помилку, якщо API повернув не масив', async () => {
    getSpy.mockResolvedValue({ data: { message: 'oops' } });

    await expect(service.getProducts()).rejects.toThrow('Некоректна відповідь API');
  });

  it('повинен пробрасувати мережеву помилку', async () => {
    getSpy.mockRejectedValue(new Error('Network Error'));

    await expect(service.getProducts()).rejects.toThrow(Error);
  });
});