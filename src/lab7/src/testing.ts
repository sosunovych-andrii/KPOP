import { Product } from './product';
import { Mock } from 'vitest';

export interface StorageMock {
  data: Map<string, unknown>;
  create: Mock<() => Promise<StorageMock>>;
  get: Mock<(key: string) => Promise<unknown>>;
  set: Mock<(key: string, value: unknown) => Promise<unknown>>;
}

export function createStorageMock(initial: Record<string, unknown> = {}): StorageMock {
  const mock: StorageMock = {
    data: new Map<string, unknown>(Object.entries(initial)),
    create: vi.fn(),
    get: vi.fn(),
    set: vi.fn(),
  };
  mock.create.mockImplementation(async (): Promise<StorageMock> => mock);
  mock.get.mockImplementation(async (key: string): Promise<unknown> => mock.data.get(key));
  mock.set.mockImplementation(async (key: string, value: unknown): Promise<unknown> => {
    mock.data.set(key, value);
    return value;
  });
  return mock;
}

export function createProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 1,
    title: 'Backpack',
    price: 109.95,
    description: 'Your perfect pack for everyday use',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/1.png',
    rating: { rate: 3.9, count: 120 },
    ...overrides,
  };
}

export const productA: Product = createProduct();
export const productB: Product = createProduct({ id: 2, title: 'T-Shirt', price: 22.3, category: 'clothing' });