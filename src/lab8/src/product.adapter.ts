import { Injectable } from '@angular/core';
import { ApiProduct, Product } from './product';

@Injectable({ providedIn: 'root' })
export class ProductAdapter {
  public isValid(raw: unknown): raw is ApiProduct {
    if (typeof raw !== 'object' || raw === null) {
      return false;
    }
    const p = raw as Partial<ApiProduct>;
    return (
      typeof p.id === 'number' &&
      typeof p.title === 'string' &&
      typeof p.price === 'number' &&
      typeof p.description === 'string' &&
      typeof p.category === 'string'
    );
  }

  public adapt(dto: ApiProduct): Product {
    return {
      id: dto.id,
      title: dto.title.trim(),
      price: dto.price,
      description: dto.description,
      category: dto.category,
      image: dto.image ?? '',
      rating: dto.rating?.rate ?? 0,
      reviews: dto.rating?.count ?? 0,
    };
  }
}