import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { Products } from 'src/app/interfaces/product';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

const BaseUrl = 'https://fakestoreapi.com';

describe('ProductService', () => {
  const products: Products[] = [
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
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('products signal', () => {
    it('should emit list of products', () => {
      expect(service.products).toBeTruthy();
      const expectUrl = [`${BaseUrl}/products`];
      const req = httpTestingController.expectOne(expectUrl.join(''));
      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toBeFalsy();
      req.flush(products);
      httpTestingController.verify();
    });
  });

  describe('getProductId', () => {
    it('should return just one product', () => {
      const idProduct = 1;
      service.getProductId(idProduct).subscribe((product) => {
        expect(product).toBe(products[0]);
      });

      const req = httpTestingController.expectOne(
        `${BaseUrl}/products/${idProduct}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(products[0]);
    });
  });
});
