import { Component, Input, OnInit } from '@angular/core';

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

  // @Input() images: carouselImage[] = []
  // @Input() indicators=true;

  selectedIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
