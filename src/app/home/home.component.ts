import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { setInterval } from 'timers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ArrowLeft: string = "./../assets/paddle_prev_999.png";
  ArrowRight: string = "./../assets/paddle_next_999.png";
  carouselActions = new EventEmitter<string | MaterializeAction>();
  carouselBrandActions = new EventEmitter<string | MaterializeAction>();

  constructor() { }

  ngOnInit() {
    setInterval(() => this.nextSlideBrand(), 3000);
  }

  fireHoverEvent($event) {
    if ($event.target.className == "center-left") {
      if ($event.type == "mouseleave") {
        this.ArrowLeft = "./../assets/paddle_prev_999.png";
      }
      if ($event.type == "mouseenter") {
        this.ArrowLeft = "./../assets/paddle_prev_fff.png";
      }
    }
    else {
      if ($event.type == "mouseleave") {
        this.ArrowRight = "./../assets/paddle_next_999.png";
      }
      if ($event.type == "mouseenter") {
        this.ArrowRight = "./../assets/paddle_next_fff.png";
      }
    }
  }

  nextSlide() {
    this.carouselActions.emit({ action: "carousel", params: ['next'] });
  }

  nextSlideBrand() {
    this.carouselBrandActions.emit({ action: "carousel", params: ['next'] });
  }

  previousSlide() {
    this.carouselActions.emit({ action: "carousel", params: ['prev'] });
  }

}
