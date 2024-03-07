import { Injectable } from '@angular/core';
import Product from '../type/product';
import { JsonPipe } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: Product[] = [];
  cartItems$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  constructor() {
    if (typeof localStorage !== 'undefined') {
      let items = localStorage.getItem('cartItems');
      console.log('localStorage content:', items); // Add this line
      if (items) {
        this.cartItems = JSON.parse(items);
      } else {
        this.cartItems = [];
      }
      this.cartItems$.next(this.cartItems);
    }
  }

  decreseQuantity(product: Product) {
    var pro = this.cartItems.find((x) => x.id == product.id);
    if (pro) {
      if (pro.quantity == 1) {
        this.cartItems = this.cartItems.filter((x) => x.id != product.id);
      } else {
        pro.quantity = pro.quantity! - 1;
      }
    }
    this.cartItems$.next(this.cartItems);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  increseQuantity(product: Product) {
    var pro = this.cartItems.find((x) => x.id == product.id);
    if (pro) {
      pro.quantity = pro.quantity! + 1;
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
    }
    this.cartItems$.next(this.cartItems);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  removerProduct(product: Product) {
    this.cartItems = this.cartItems.filter((x) => x.id != product.id);
    this.cartItems$.next(this.cartItems);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}