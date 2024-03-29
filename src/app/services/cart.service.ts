import { Injectable, computed, inject, signal } from '@angular/core';
import { Products } from '../interfaces/product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Products[]>([]);

  private productServices = inject(ProductsService);

  addProduct(product: Products) {
    this.cart.update((products) => [...products, product]);

    this.productServices.products()?.forEach((p) => {
      if (p.id === product.id) {
        p.rating.count = p.rating.count - 1;
      }
    });
  }

  removeProduct(index: number) {
    this.cart.mutate((products) => {
      const product = products.splice(index, 1);

      this.productServices.products()?.forEach((p) => {
        if (p.id === product[0]?.id) {
          p.rating.count = p.rating.count + 1;
        }
      });
    });
  }

  totalItems = computed(() => this.cart().length);
  amount = computed(() => {
    return this.cart().reduce((prev: number, curr: Products) => {
      return prev + curr.price;
    }, 0);
  });

  sellProducts() {
    this.cart.set([]);
  }
}
