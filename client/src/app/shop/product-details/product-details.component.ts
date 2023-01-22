import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/IProduct';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Breadcrumb } from 'xng-breadcrumb/lib/types/breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId = 0;
  products: IProduct;
  quantity=1;

  constructor(private shopService:ShopService,private activateRoute : ActivatedRoute,private breadCrumbService:BreadcrumbService,private basketService:BasketService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe({
      next: (res)=> {
        this.productId = res["id"]
        this.loadProduct();
      }

    })
    //this.loadProduct();
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.products,this.quantity)
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    if(this.quantity>1){
      this.quantity--;
    }

  }

  loadProduct(){
    this.shopService
    .getProduct(this.productId)
    .subscribe((pro) => {
      this.products=pro;
      this.breadCrumbService.set('@shopDetail',this.products.name);
      console.log(pro)

    }),
    (error:any) => {
      console.log(error);
    };
  }

}


