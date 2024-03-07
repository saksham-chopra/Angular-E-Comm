import { Component, ViewChild, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { ProductCardComponent } from '../product-card/product-card.component';
import { HttpService } from '../../services/http.service';
import Product from '../../type/product';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatPaginatorModule,MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatInputModule,
    MatCardModule,
    ProductCardComponent,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
    MatPaginator,
    NgxPaginationModule,
    MatTableModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchControl= new FormControl("");
httpService = inject(HttpService);
dataSource=new MatTableDataSource<Product>();
@ViewChild(MatPaginator) paginator!:MatPaginator;
products: Product[]=[];
filteredProducts:Product[]=[];
// pageSize =3 ;
// currentPage = 1;
ngOnInit(){
  this.httpService.getProducts().subscribe((result)=>{
    console.log(result);
    this.products=result;
    this.filteredProducts=this.products;
  });
  this.searchControl.valueChanges.subscribe((result)=>{
    console.log(result);
    if(result){
      this.filteredProducts=this.products.filter((x)=>
      x.name.toLowerCase().includes(result.toLowerCase()) ||
      x.brand.toLowerCase().includes(result.toLowerCase())
      );
    }else{
      this.filteredProducts=this.products;
    }
  })
}
ngAfterViewInit(){
  // this.dataSource.sort=this.sort;
  this.dataSource.paginator=this.paginator;
}


}