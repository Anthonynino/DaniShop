import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input({required: true}) product!: Products;

   cartService = inject(CartService)

   alertService = inject(AlertService)

   alert = false;

   constructor(){
    this.alertService.alert$.subscribe((res)=>{
      this.alert = true;
      setTimeout(()=>{
        this.alert = false;
      }, 1500)
    })
   }

  addProduct(product: Products){
    this.cartService.addProduct(product)
    this.alertService.showAlert()
  }

}
