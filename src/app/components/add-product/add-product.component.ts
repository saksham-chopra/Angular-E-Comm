import { Component,inject } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../services/http.service';
import Product from '../../type/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatButtonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
builder = inject(FormBuilder);
productForm = this.builder.group({
  brand:["",[Validators.required]],
  image:["",[Validators.required]],
  currentPrice:[""],
  standardPrice:[""],
  discount:[""],
  name:["",[Validators.required]],
});

httpService = inject(HttpService);
router = inject(Router);
route=inject(ActivatedRoute);
isEdit=false;
productId!:number;
ngOnInit(){
this.productId= this.route.snapshot.params["id"];
if(this.productId){
  this.isEdit=true;
  this.httpService.getProduct(this.productId).subscribe((result)=>{
    this.productForm.patchValue(result);
  });
}
}
submit(){
  let formValues = this.productForm.value as Product;
  console.log(formValues);
  console.log("form valid",this.productForm.valid);
  if(this.productForm.invalid){
    alert("Please Provide required field");
    return;
  }
  this.httpService.addProduct(formValues).subscribe(()=>{
    alert("product added");
    this.router.navigateByUrl('/');
  })
}
update(){
let formValues=this.productForm.value as Product;
if(this.productForm.invalid){
  alert('Please provide required field');
  return;
}
this.httpService.updateProduct(this.productId,formValues)
.subscribe(()=>{
  alert('product updated');
  this.router.navigateByUrl('/product-detail/'+this.productId);
});
}
}
