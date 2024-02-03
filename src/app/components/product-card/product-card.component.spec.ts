import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { CartService } from 'src/app/services/cart.service';
import { MockCartService } from 'src/mocks';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Products } from 'src/app/interfaces/product';


describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductCardComponent, RouterTestingModule],
      providers: [
        {
          provide: CartService,
          useClass: MockCartService,
        },
      ],
    });
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.product = products[0];
   
    
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("LigthBox funciona",()=>{
    it("Button change boolean value", ()=>{
      const img = fixture.debugElement.query(By.css('img.test'))
      img.nativeElement.click();

      expect(component.lightBox).toBeTrue()
    })
  describe("Button navigate to route details",()=>{
    it('should navigate to another route when the button is clicked', () => {
      
      const route = TestBed.inject(Router);
      const navigateSpy = spyOn(route, 'navigate');
      const button = fixture.debugElement.query(By.css('button.navigate'))
      
      button.nativeElement.click();
      expect(navigateSpy).toHaveBeenCalledWith([`/details/`,products[0].id]);
    });
  })
  describe('Button add product funciona',()=>{
    
    it("Add product funciona",()=>{

      spyOn(component, 'addProduct');
      
      const button = fixture.debugElement.query(By.css('button.comprar'))
      button.nativeElement.click();
      
      expect(component.addProduct).toHaveBeenCalled();
      
    })
  })
  })
});
