import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/IProduct';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: IProduct[]=[];
  brands: IProductBrand[]=[];
  types: IProductType[]=[];
  constructor(private shopservice:ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypess();
  }

  getProducts(){
    this.shopservice.getProducts().subscribe(response =>{
      this.products =response.data;
      console.log(this.products)
    },err=>{
      console.log(err);
    });
  }

  getBrands(){
    this.shopservice.getBrands().subscribe(response=>{
      this.brands = response;
    },err=>{
      console.log(err);
    });
  }

  getTypess(){
    this.shopservice.getTypess().subscribe(response=>{
      this.types = response;
    },err=>{
      console.log(err);
    });
  }

}
