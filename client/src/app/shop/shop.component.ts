import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/IProduct';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  @ViewChild('search', {static:true}) searchTerm! : ElementRef;
  products: IProduct[]=[];
  brands: IProductBrand[]=[];
  types: IProductType[]=[];
  shopParams=new ShopParams();
  totalCount!:number;
  sortOption=[
    {name:"Alphabetical",value:"name"},
    {name:"Price : Low to High",value:"priceAsc"},
    {name:"Price : High to Low ",value:"priceDesc"}

  ];

  constructor(private shopservice:ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypess();
  }

  getProducts(){
    this.shopservice.getProducts(this.shopParams).subscribe(response =>{
      this.products =response!.data;
      this.shopParams.pageNumber=response!.pageIndex;
      this.shopParams.pageSize=response!.pageSize;
      this.totalCount=response!.count;
      console.log(this.totalCount);
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
    this.shopParams.brandId=brandId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }
  onTypeSelected(typeId:number){
    this.shopParams.typeId=typeId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  onSortSelected(sort:string){
    this.shopParams.sort=sort;
    this.getProducts();
  }

  onPageChange(evet:any){
    if(this.shopParams.pageNumber!==evet){
      this.shopParams.pageNumber=evet;
      this.getProducts();
    }

  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }
  onReset(){
    this.searchTerm.nativeElement.value=undefined;
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
