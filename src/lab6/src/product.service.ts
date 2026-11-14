import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Product } from './product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http: AxiosInstance = axios.create({
    baseURL: 'https://fakestoreapi.com',
    timeout: 10000,
  });

  public async getProducts(): Promise<Product[]> {
    const response = await this.http.get<unknown>('/products');
    if (!Array.isArray(response.data)) {
      throw new Error('Некоректна відповідь API');
    }
    return response.data.filter((item: unknown): item is Product => this.isProduct(item));
  }

  private isProduct(item: unknown): item is Product {
    if (typeof item !== 'object' || item === null) {
      return false;
    }
    const p = item as Partial<Product>;
    return (
      typeof p.id === 'number' &&
      typeof p.title === 'string' &&
      typeof p.price === 'number' &&
      typeof p.description === 'string' &&
      typeof p.category === 'string'
    );
  }
}