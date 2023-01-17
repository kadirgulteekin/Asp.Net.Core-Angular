import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketTotals } from '../models/basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.css']
})
export class OrderTotalsComponent {



  basketTotal$ : Observable<IBasketTotals | null | undefined>;

  basketTotal: IBasketTotals | null | undefined;

  constructor(private basketService : BasketService) { }

  ngOnInit(): void {

    this.basketTotal$ = this.basketService.basketTotal$;

    this.basketTotal$.subscribe(response=>{
      this.basketTotal = response;
      console.log("Subscribe Log ",this.basketTotal);
    })
  }

}
