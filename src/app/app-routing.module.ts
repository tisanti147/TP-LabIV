import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { PrivatePageComponent } from './pages/private-page/private-page.component';
import { AuthGuard } from './guards/auth-guard';
import { LoginGuard } from './guards/login-guard';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent, canActivate: [LoginGuard]},
  {path: 'private', component: PrivatePageComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterPageComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
