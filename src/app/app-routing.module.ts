import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BackgroundImageResolver } from './resolvers/background-image.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      background: BackgroundImageResolver,
    },
  },
  {
    path: '',
    component: HomeComponent,
    resolve: {
      background: BackgroundImageResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [BackgroundImageResolver]
})
export class AppRoutingModule { }