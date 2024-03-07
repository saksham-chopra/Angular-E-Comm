import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import Product from '../../type/product';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
cartService = inject(CartService);
cartItems!:Product[];
ngOnInit(){
 this.cartService.cartItems$.subscribe((result)=>{
  this.cartItems=result;
 });
  console.log(this.cartItems); 
  
}
decreaseQuantity(product:Product){
this.cartService.decreseQuantity(product);
}
increaseQuantity(product:Product){
  this.cartService.increseQuantity(product);
}
removeProduct(product:Product){
  this.cartService.removerProduct(product);
}
get totalPrice(){
  let sum=0;
  for(let product of this.cartItems){
    sum+=(+product.standardPrice)*(+product.quantity!);
  }
  return sum;
}
get totalDiscount(){
  
return this.totalPrice-this.totalAmount;
}
get totalAmount(){
  let sum=0;
  for(let product of this.cartItems){
    sum+=(+product.currentPrice)*(+product.quantity!);
  }
  return sum;
}
}
