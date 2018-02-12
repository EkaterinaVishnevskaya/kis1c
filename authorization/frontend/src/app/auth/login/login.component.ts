import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private signInSubscription: Subscription;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: AuthService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      'username': '',
      'password': ''
    });
  }
  ngOnDestroy() {
    this.signInSubscription && this.signInSubscription.unsubscribe();
  }
  onSubmit() {
    this.signInSubscription = this.loginService.signIn(this.signupForm.value.username, this.signupForm.value.password).subscribe(
      res => {
        if (res.ok) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['home']);
        }
      }, err => {
        console.log('error occured');
      }
    );
  }

}
