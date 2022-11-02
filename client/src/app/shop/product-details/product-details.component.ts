import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/IProduct';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId = 0;
  products: IProduct;

  constructor(private shopService:ShopService,private activateRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe({
      next: (res)=> {
        this.productId = res["id"]
        this.loadProduct();
      }

    })
    //this.loadProduct();
  }

  loadProduct(){
    this.shopService
    .getProduct(this.productId)
    .subscribe((pro) => {
      this.products=pro;
      console.log(pro)

    }),
    (error:any) => {
      console.log(error);
    };
  }

}


