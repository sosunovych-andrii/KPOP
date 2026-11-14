import { InjectionToken } from '@angular/core';
import { Product } from './product';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
}

export const PRODUCT_REPOSITORY: InjectionToken<ProductRepository> = new InjectionToken<ProductRepository>(
  'PRODUCT_REPOSITORY',
);