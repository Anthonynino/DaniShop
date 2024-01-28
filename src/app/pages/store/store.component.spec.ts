import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreComponent } from './store.component';
import { MockProductsService } from 'src/mocks';
import { ProductsService } from 'src/app/services/products.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreComponent, BrowserAnimationsModule],
      providers: [
        {
          provide: ProductsService,
          useClass: MockProductsService,
        },
      ],
    });
    fixture = TestBed.createComponent(StoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
