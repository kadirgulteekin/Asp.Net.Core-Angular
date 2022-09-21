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
  brandIdSelected?:number;
  typeIdSelected?:number;

  constructor(private shopservice:ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypess();
  }

  getProducts(){
    this.shopservice.getProducts(this.brandIdSelected,this.typeIdSelected).subscribe(response =>{
      this.products =response!.data;
      console.log(this.products)
    },err=>{
      console.log(err);
    });
  }

  getBrands(){
    this.shopservice.getBrands().subscribe(response=>{
      this.brands = [{id:0,name:'All'},...response];
    },err=>{
      console.log(err);
    });
  }

  getTypess(){
    this.shopservice.getTypess().subscribe(response=>{
      this.types = [{id:0,name:'All'},...response];
    },err=>{
      console.log(err);
    });
  }

  onBrandSelected(brandId:number){
    this.brandIdSelected=brandId;
    this.getProducts();
  }
  onTypeSelected(typeId:number){
    this.typeIdSelected=typeId;
    this.getProducts();
  }

}
