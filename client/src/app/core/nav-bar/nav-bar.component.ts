import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, IBasket } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  basket$:Observable<IBasket |null | undefined> ;
  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    //kendisine bağlı verileri tetikleyen yer.

    this.basket$  = this.basketService.basket$ ;

  }

}
