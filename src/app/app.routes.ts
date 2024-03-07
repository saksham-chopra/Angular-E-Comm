import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
    },
    {
        path:'product-detail/:id',
        component:ProductDetailComponent,
    },{
        path:'add-product',
        component:AddProductComponent
    },
    {
        path:'product/:id',
        component:AddProductComponent,
    },
    {
        path:"cart",
        component:CartComponent,
    }
];
