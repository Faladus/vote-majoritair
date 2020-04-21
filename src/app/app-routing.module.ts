import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { BackgroundImageResolver } from './resolvers/background-image.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      background: BackgroundImageResolver
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }