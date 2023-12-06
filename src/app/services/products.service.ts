import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Products } from '../interfaces/product';
import {toSignal} from '@angular/core/rxjs-interop'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly http = inject(HttpClient)
  constructor() { }

  

  products = toSignal<Products[]>(this.http.get<Products[]>('https://fakestoreapi.com/products'))

  getProductId(id: number | string):Observable<any>{
    return this.http.get(`https://fakestoreapi.com/products/${id}`)
  }
}
