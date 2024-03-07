import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import Product from '../type/product';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
http= inject(HttpClient);
  constructor() {

   }
   getProducts(){
    return this.http.get<Product[]>("http://localhost:3000/products");
   }
   getProduct(id:number){
    return this.http.get<Product>("http://localhost:3000/products/"+id);
   }
   addProduct(product: Product) {
    return this.http.post<Product>("http://localhost:3000/products", product);
  }
  updateProduct(productId:number,product:Product){
    return this.http.put<Product>("http://localhost:3000/products/"+productId, product);
  }
  deleteProduct(productId:number){
    return this.http.delete<Product>("http://localhost:3000/products/"+productId);
  }
}
