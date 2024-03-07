import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import Product from '../../type/product';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
@Input() product!:Product;
router = inject(Router);
onbuy(){
  this.router.navigateByUrl('/product-detail/'+this.product.id);
}
}
