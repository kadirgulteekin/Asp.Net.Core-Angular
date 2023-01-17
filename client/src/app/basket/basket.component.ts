import { Component } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})

export class BasketComponent {

  basket$: Observable<IBasket | null | undefined>;


  basket: Basket | null | undefined;
  constructor(private basketService:BasketService){


  }

  ngOnInit(): void{
    this.basket$  = this.basketService.basket$ ;
    this.basket$.subscribe(response=>{
      this.basket = response;
      console.log("Subscribe log",this.basket)
    })
  }

  removeBasketItem(item:IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item:IBasketItem){
    this.basketService.incrementItemQuantity(item)
  }

  decrementItemQuantity(item:IBasketItem){
    this.basketService.decrementItmQuantity(item);
  }


}
