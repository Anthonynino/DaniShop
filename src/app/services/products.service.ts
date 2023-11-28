import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Products } from '../interfaces/product';
import {toSignal} from '@angular/core/rxjs-interop'


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly http = inject(HttpClient)
  constructor() { }

  products = toSignal<Products[]>(this.http.get<Products[]>('https://fakestoreapi.com/products'))
}
