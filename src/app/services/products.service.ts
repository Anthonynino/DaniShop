import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Products } from '../interfaces/product';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

const BaseUrl = 'https://fakestoreapi.com';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);

  products = toSignal<Products[]>(
    this.http.get<Products[]>(`${BaseUrl}/products`)
  );

  getProductId(id: number | string): Observable<Products> {
    return this.http.get<Products>(`${BaseUrl}/products/${id}`);
  }
}
