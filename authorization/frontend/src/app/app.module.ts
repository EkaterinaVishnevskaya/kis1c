import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth/auth.service';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {CookieService} from "ngx-cookie-service";
import {AuthGuard} from "./auth/auth.guard";

const appRoutes: Routes = [
  {path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {path: 'sign-in', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [AuthService, HttpClient, CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
