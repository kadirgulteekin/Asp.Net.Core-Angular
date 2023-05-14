import { Component, Output ,EventEmitter, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, IBasket, IBasketItem } from '../../models/basket';


@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.css']
})
export class BasketSummaryComponent {

  basket$: Observable<IBasket | null | undefined>;
  basket: Basket | null | undefined;

  @Output() decrement :  EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() increment :  EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove :  EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Input() isBasket  = true
  constructor(private basketService: BasketService){}

  ngOnInit(): void{
    this.basket$  = this.basketService.basket$ ;
    this.basket$.subscribe(response=>{
      this.basket = response;
      console.log("Subscribe log",this.basket)
    });
  }


  decrementItemQuantity (item:IBasketItem){
    this.basketService.decrementItmQuantity(item);
  }
  incrementItemQuantity (item:IBasketItem){
    this.basketService.incrementItemQuantity(item)
  }
  removeBasketItem (item:IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }



}
