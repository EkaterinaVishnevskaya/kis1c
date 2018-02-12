import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

import {User} from "./sign-up/user";
import {RequestOptions} from "@angular/http";
import * as url from "url";
import {Response} from "./response";
import {Subscriber} from "rxjs/Subscriber";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class AuthService {

  loginURL = 'http://localhost:8080/login';
  registerURL = 'http://localhost:8080/register';
  logoutURL = 'http://localhost:8080/logout';

  constructor(private http: HttpClient) {
  }

  post(url: string, body: Object, options?: any): Observable<any> {
    options = options || {};
    return this.http.post(url, body, options);
  }

  signIn(username, password): Observable<Response> {
    const requestParam = {
      username: username,
      password: password
    };
    return this.post(this.loginURL, requestParam);
  }

  signUp(user: User): Observable<Response> {
    return this.post(this.registerURL, user);
  }

  signOut(): Observable<Response> {
    const token = localStorage.getItem('token');
    localStorage.clear();
    return this.post(this.logoutURL, token);
  }
}
