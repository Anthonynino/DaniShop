import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, delay, of } from 'rxjs';
import { Products } from 'src/app/interfaces/product';

export class MockProductsService {
  productsMock: Products[] = [
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

  products = toSignal<Products[]>(of(this.productsMock));

  getProductId(id: number | string): Observable<Products> {
    return of(this.productsMock[0]).pipe(delay(1000));
  }
}
