import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AppComponent } from 'src/app/app.component';
import { LayoutComponent } from 'src/app/layout/layout.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends LayoutComponent implements OnInit {
  constructor(
    protected route: ActivatedRoute
  ) {
    super(route);
  }
}
