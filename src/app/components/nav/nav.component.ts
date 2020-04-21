import { Component } from '@angular/core';

interface ROUTE {
  icon?: string;
  route?: string;
  title?: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  myWorkRoutes: ROUTE[] = [
    // {
    //   icon: 'add_circle',
    //   route: 'addTeam',
    //   title: 'Porposer un groupe',
    // },
    // {
    //   icon: 'how_to_vote',
    //   route: 'addTeam',
    //   title: '',
    // },
  ];

  customerRoutes: ROUTE[] = [
    {
      icon: 'add_circle',
      route: 'createVote',
      title: 'Créer un vote',
    },
  ];

  constructor() {}
}
