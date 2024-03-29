import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  imageUrl: string = "https://raw.githubusercontent.com/CraveFM/nsDirectiveTouchAnimationApp/main/src/assets/angular.png";

  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onCardTap(index: number): void {
    console.log('card tap', index);
  }

}
