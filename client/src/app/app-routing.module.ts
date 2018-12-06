import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouteGuard } from './core/guard/route.guard';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'redirection',
    component: RedirectComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [RouteGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
