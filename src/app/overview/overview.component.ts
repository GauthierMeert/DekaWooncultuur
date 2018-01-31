import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateCatgories() {
    this.router.navigate(["./categories"]); //Slash in URL geeft aan dat je wil navigeren vanaf de root --> ./ voegt gewoon toe aan url
  }
}
