import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';
import { IPagination } from '../shared/models/IPagination';
import { IProduct } from '../shared/models/IProduct';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';


@Injectable({//bu servise başka yerlerden ulaialbilmemiz için yol=public
  providedIn: 'root' //kök dizininde geliyor
})
export class ShopService {
  baseUrl="https://localhost:44376/api/";

  constructor(private http:HttpClient) { }

  getProducts(shopParams:ShopParams){
    let params = new HttpParams();
    if(shopParams.brandId!==0){
      params=params.append('brandId',shopParams.brandId.toString());
    }
    if(shopParams.typeId!=0){
      params=params.append('typeId',shopParams.typeId.toString());
    }
    if(shopParams.search){
      params = params.append("search",shopParams.search)
    }


      params=params.append("sort",shopParams.sort);
      params =params.append("pageIndex",shopParams.pageNumber.toString());
      params=params.append("pageIndex",shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl+"Products",{observe:'response',params})
      .pipe(
        map(response =>{
          return response.body;
        })
    );
  }
  getProduct(id:number){
    return this.http.get<IProduct>(this.baseUrl + 'products/'+id)
  }
  getBrands(){
    return this.http.get<IProductBrand[]>(this.baseUrl+'products/brands');
  }

  getTypess(){
    return this.http.get<IProductType[]>(this.baseUrl+'products/types');
  }
}
