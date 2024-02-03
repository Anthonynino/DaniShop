import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Products } from '../interfaces/product';

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

describe('CartService', () => {
  let service: CartService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      
      imports: [HttpClientModule],
    });
   
    service = TestBed.inject(CartService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Cart signal', ()=>{
    it("Should signal are empty", ()=>{
      expect(service.cart).toHaveSize(0)
    })
    it('should add a product to the cart', () => {
      
      service.addProduct(products[0]);
      service.addProduct(products[1]);
  
      expect(service.cart()).toEqual(products);
    });

    
  it('should calculate the total amount correctly', () => {
    service.cart.set([products[0],products[1]]);

    const totalAmount = service.amount();

    expect(totalAmount).toBe(44);
  });

  it('should remove a product from the cart', () => {
    

    service.cart.set([products[0], products[1]]);

    service.removeProduct(0);

    expect(service.cart()).toEqual([products[1]]);
    
  });

  it('should reset the cart when selling products', () => {
    

    service.cart.set([products[0]]);

    service.sellProducts();

    expect(service.cart()).toEqual([]);
  });
  })
});
