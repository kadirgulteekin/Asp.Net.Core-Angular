import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';
import { IPagination } from '../shared/models/IPagination';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';


@Injectable({//bu servise başka yerlerden ulaialbilmemiz için yol=public
  providedIn: 'root' //kök dizininde geliyor
})
export class ShopService {
  baseUrl="https://localhost:44376/api/";

  constructor(private http:HttpClient) { }

  getProducts(brandId? : number,typeId? :number){
    let params = new HttpParams();
    if(brandId){
      params=params.append('brandId',brandId.toString());
    }
    if(typeId){
      params=params.append('typeId',typeId.toString());
    }
    return this.http.get<IPagination>(this.baseUrl+"Products",{observe:'response',params})
      .pipe(
        map(response =>{
          return response.body;
        })
    );
  }

  getBrands(){
    return this.http.get<IProductBrand[]>(this.baseUrl+'products/brands');
  }

  getTypess(){
    return this.http.get<IProductType[]>(this.baseUrl+'products/types');
  }
}
