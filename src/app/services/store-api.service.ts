import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, StoreUser } from '../models/store.models';

@Injectable({ providedIn: 'root' })
export class StoreApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://fakestoreapi.com';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  getUsers(): Observable<StoreUser[]> {
    return this.http.get<StoreUser[]>(`${this.baseUrl}/users`);
  }
}
