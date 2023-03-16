import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SlideInterface } from '../shared/models/slide.interface';


interface carouselImage {
  imageSrc:string;
  imageAlt:string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {


  @Input() slides: SlideInterface[] = [];
  selectedIndex = 0;


  constructor() { }

  ngOnInit(): void {

  }


}
