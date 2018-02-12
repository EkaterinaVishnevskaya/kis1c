import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.signOut().subscribe(() => this.router.navigate(['sign-in']));
  }

}
