import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ArrowLeft: string = "./../assets/paddle_prev_999.png";
  ArrowRight: string = "./../assets/paddle_next_999.png";

  constructor() { }

  ngOnInit() {
  }

  fireHoverEvent($event) {
    if($event.target.className == "center-left")
    {
      if ($event.type == "mouseleave") {
        this.ArrowLeft = "./../assets/paddle_prev_999.png";
      }
      if ($event.type == "mouseenter") {
        this.ArrowLeft = "./../assets/paddle_prev_fff.png";
      }
    }
    else
    {
      if ($event.type == "mouseleave") {
        this.ArrowRight = "./../assets/paddle_next_999.png";
      }
      if ($event.type == "mouseenter") {
        this.ArrowRight = "./../assets/paddle_next_fff.png";
      }
    }
  }
}
