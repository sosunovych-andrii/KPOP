import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { FavoritesService } from './favorites.service';
import { StorageMock, createStorageMock, productA, productB } from './testing';

describe('FavoritesService', () => {
  let storage: StorageMock;

  async function setup(initial: Record<string, unknown> = {}): Promise<FavoritesService> {
    storage = createStorageMock(initial);
    TestBed.configureTestingModule({
      providers: [{ provide: Storage, useValue: storage }],
    });
    const service: FavoritesService = TestBed.inject(FavoritesService);
    await service['ready'];
    return service;
  }

  it('повинен ініціалізувати сховище один раз', async () => {
    await setup();

    expect(storage.create).toHaveBeenCalledTimes(1);
    expect(storage.get).toHaveBeenCalledWith('favorites');
  });

  it('повинен мати порожній список, якщо в сховищі нічого немає', async () => {
    const service = await setup();

    expect(service.favorites()).toEqual([]);
    expect(service.favorites()).toHaveLength(0);
  });

  it('повинен завантажити збережене вибране зі сховища', async () => {
    const service = await setup({ favorites: [productA] });

    expect(service.favorites()).toEqual([productA]);
  });

  it('повинен ігнорувати некоректні дані в сховищі', async () => {
    const service = await setup({ favorites: 'broken' });

    expect(service.favorites()).toEqual([]);
  });

  it('has() повинен повертати true лише для доданих продуктів', async () => {
    const service = await setup({ favorites: [productA] });

    expect(service.has(productA)).toBe(true);
    expect(service.has(productB)).toBeFalsy();
  });

  it('toggle() повинен додати продукт і зберегти його у сховище', async () => {
    const service = await setup();

    await service.toggle(productA);

    expect(service.favorites()).toContain(productA);
    expect(storage.set).toHaveBeenCalledWith('favorites', [productA]);
  });

  it('toggle() повинен прибрати вже доданий продукт', async () => {
    const service = await setup({ favorites: [productA, productB] });

    await service.toggle(productA);

    expect(service.favorites()).toEqual([productB]);
    expect(storage.data.get('favorites')).toEqual([productB]);
  });

  it('remove() повинен видалити продукт зі списку та сховища', async () => {
    const service = await setup({ favorites: [productA, productB] });

    await service.remove(productB);

    expect(service.favorites()).not.toContain(productB);
    expect(storage.set).toHaveBeenLastCalledWith('favorites', [productA]);
  });
});