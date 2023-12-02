import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { ProductsService } from 'src/app/services/products.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent {
  productService = inject(ProductsService);

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
  
}
