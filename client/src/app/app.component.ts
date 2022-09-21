import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-first',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'E-Ticaret';


  constructor(){}

  ngOnInit(): void {
    // this.http.get<IPagination>('https://localhost:44376/api/Products').subscribe((response:IPagination)=>{
    //   this.products=response.data;
    // },error=>{
    //   console.log(error);
    // });
  }
}
