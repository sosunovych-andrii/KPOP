import { inject, Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { ApiProduct, Product } from './product';
import { ProductAdapter } from './product.adapter';
import { ProductRepository } from './product.repository';

@Injectable({ providedIn: 'root' })
export class FakeStoreRepository implements ProductRepository {
  private readonly adapter: ProductAdapter = inject(ProductAdapter);
  private readonly http: AxiosInstance = axios.create({
    baseURL: 'https://fakestoreapi.com',
    timeout: 10000,
  });

  public async getAll(): Promise<Product[]> {
    const response = await this.http.get<unknown>('/products');
    if (!Array.isArray(response.data)) {
      throw new Error('Некоректна відповідь API');
    }
    return response.data
      .filter((raw: unknown): raw is ApiProduct => this.adapter.isValid(raw))
      .map((dto: ApiProduct): Product => this.adapter.adapt(dto));
  }
}