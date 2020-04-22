import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';
import { Vote } from 'src/app/classes/Vote';

@Component({
  selector: 'app-home',
  templateUrl: './vote_config.component.html',
  styleUrls: ['./vote_config.component.scss']
})
export class  VoteConfigComponent extends LayoutComponent implements OnInit {
  public name: string;
  public vote: Vote;

  constructor(
    protected route: ActivatedRoute, private apiService: ApiService
  ) {
    super(route);

    this.name = 'Editeur de vote';
    this.vote = new Vote();
  }
}
