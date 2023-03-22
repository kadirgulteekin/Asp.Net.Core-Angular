import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { SlideInterface } from './shared/models/slide.interface';



@Component({
  selector: 'app-first',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'E-Ticaret';



  constructor(private basketService:BasketService,private accountService:AccountService){

  }

  ngOnInit(): void {
    this.loadBasket();

  }

  loadCurrentUser(){
    const token = localStorage.getItem('token');
    if(token){
      this.accountService.loadCurrentUser(token).subscribe(()=>{
        console.log('Loaded User');
      },
      (error) => {
        console.log(error)
      }
      )
    }
  }

  loadBasket(){
      // });
      const basketId=localStorage.getItem('basket_id');
      if(basketId){
        this.basketService.getBasket(basketId).subscribe(()=>{
          console.log("initiliaze basket");
        },error =>{
          console.log(error);
        })
      }
  }
}
