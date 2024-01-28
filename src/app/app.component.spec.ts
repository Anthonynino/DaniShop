import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CartService } from './services/cart.service';
import { MockCartService } from 'src/mocks';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppComponent, RouterTestingModule],
    providers: [
      {
        provide: CartService,
        useClass: MockCartService,
      },
    ],
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
