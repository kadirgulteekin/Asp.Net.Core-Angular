import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  basket$:Observable<IBasket|null | undefined> ;
  currentUser$:Observable<IUser |null | undefined>;

  constructor(private basketService:BasketService,private accountService:AccountService) { }

  ngOnInit(): void {
    //kendisine bağlı verileri tetikleyen yer.

    this.basket$  = this.basketService.basket$ ;
    this.currentUser$ = this.accountService.currentUser$;

  }

}
