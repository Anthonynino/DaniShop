import { computed, signal } from '@angular/core';
import { Products } from 'src/app/interfaces/product';

export class MockCartService {
  cart = signal<Products[]>([]);

  products: Products[] = [
    {
      id: 1,
      title: 'test 1',
      price: 22,
      description: 'test descr1',
      category: 'cat1',
      image: '',
      rating: { rate: 1, count: 2 },
    },
    {
      id: 2,
      title: 'test 2',
      price: 22,
      description: 'test descr2',
      category: 'cat2',
      image: '',
      rating: { rate: 2, count: 2 },
    },
  ];

  addProduct(product: Products) {
    this.cart.update((products) => [...products, product]);

    this.products?.forEach((p) => {
      if (p.id === product.id) {
        p.rating.count = p.rating.count - 1;
      }
    });
  }

  removeProduct(index: number) {
    this.cart.mutate((products) => {
      const product = products.splice(index, 1);

      this.products?.forEach((p) => {
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
