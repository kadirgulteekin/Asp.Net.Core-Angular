import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/IProduct';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  // incrementItemQuantity(item: IBasketItem) {
  //   throw new Error('Method not implemented.');
  // }

  basketUrl = environment.apiUrl;

  private basketSource = new BehaviorSubject<IBasket|null>(null);
  basket$= this.basketSource.asObservable();

  private basketTotalSource=new BehaviorSubject<IBasketTotals|null>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http:HttpClient,private toastrService:ToastrService) { }

  getBasket(id : string){
    return this.http.get<IBasket>(this.basketUrl + 'basket?id='+id)
      .pipe(
        map((basket:IBasket) =>{
          this.basketSource.next(basket);
         this.calculateTotals();
        })
      );

  }



  setBasket(basket:IBasket){
    return this.http.post<IBasket>(this.basketUrl + 'basket',basket).subscribe((response : IBasket)=>{
      this.basketSource.next(response);
      this.calculateTotals();
      if(localStorage.getItem('basket_id')==="undefined"){
        localStorage.setItem('basket_id',response.id);
      }
      console.log(response);
    },error =>{
      console.log(error);
    });
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    if(basket!=null){
      const subTotal = basket.items.reduce((a, b) => b.price * b.quantity + a, 0);
      const total=subTotal+shipping;
      this.basketTotalSource.next({ shipping, total, subTotal });
    }
  }

  addItemToBasket(item:IProduct,quantity=1){
    const itemToAdd : IBasketItem = this.mapProductItemToBasketItem(item,quantity);
    const basket =this.getCurrentBasketValue() ?? this.createBasket();

    basket.items = this.addOrUpdateItem(basket.items,itemToAdd,quantity);
    this.setBasket(basket);

  }





  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if(basket !=null)
    if(basket.items.some(x=>x.id === item.id)){
      basket.items = basket.items.filter(i=> i.id !== item.id);
      if(basket.items.length>0){
        this.setBasket(basket);
      }else{
        this.deleteBasket(basket);
      }
    }

    }



  deleteBasket(basket: IBasket) {
    return this.http.delete(this.basketUrl+'basket?id='+basket.id).subscribe(()=>{
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    },error=>{
      console.log(error);
    });

  }

  incrementItemQuantity(item:IBasketItem){

   const basket=this.getCurrentBasketValue();   //get all products from basket

   if(basket!=null){
    const foundItemIndex=basket?.items.findIndex(x=>x.id===item.id); //Which product should be increased?
    basket.items[foundItemIndex].quantity++; //ı increase quantity
    this.setBasket(basket);

   }

  }

  decrementItmQuantity(item:IBasketItem){
    const basket=this.getCurrentBasketValue();   //get all products from basket

   if(basket!=null){
    const foundItemIndex=basket?.items.findIndex(x=>x.id===item.id); //Which product should be increased?
    if(basket.items[foundItemIndex].quantity>1){
      basket.items[foundItemIndex].quantity--;
    }else{
      this.removeItemFromBasket(item);
    }; //ı increase quantity
    this.setBasket(basket);

   }

  }


   private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number)
   : IBasketItem[]{
      console.log('addOrUpdateItem =>',items)
      const index = items.findIndex(i=>i.id===itemToAdd.id);
      if(index===-1){
        items.push(itemToAdd)
      }
      else{
        items[index].quantity+=quantity;
      }
      return items;

  }


  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id',basket.id);
    return basket;
  }
  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id:item.id,
      productName:item.name,
      price:item.price,
      pictureUrl:item.pictureUrl,
      quantity ,
      brand:item.productBrand,
      type:item.productType
    }
  }
}
