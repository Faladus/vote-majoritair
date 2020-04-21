import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class VoteConfigComponent extends LayoutComponent implements OnInit {

  public name;

  constructor(
    protected route: ActivatedRoute, private apiService: ApiService, protected dialog: MatDialog
  ) {
    super(route);

    this.name = 'Eléction de la BCE';
  }
}
