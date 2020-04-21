import { Component, OnInit } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  backgroundImage: SafeStyle;

  constructor(
    protected route: ActivatedRoute
  ) {
    this.backgroundImage = this.route.snapshot.data.background;
  }

  ngOnInit() {

  }
}
