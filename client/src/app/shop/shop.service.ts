import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/IPagination';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';

@Injectable({//bu servise başka yerlerden ulaialbilmemiz için yol=public
  providedIn: 'root' //kök dizininde geliyor
})
export class ShopService {
  baseUrl="https://localhost:44376/api/";

  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get<IPagination>(this.baseUrl+"Products");
  }

  getBrands(){
    return this.http.get<IProductBrand[]>(this.baseUrl+'products/brands');
  }

  getTypess(){
    return this.http.get<IProductType[]>(this.baseUrl+'products/types');
  }
}
