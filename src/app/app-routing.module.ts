import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PontomaisGuard} from "./pontomais.guard";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [PontomaisGuard],
  }, {
    path: 'login', component: LoginComponent,
  }, {
    path: '**', redirectTo: '/login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
