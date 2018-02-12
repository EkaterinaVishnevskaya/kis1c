import {CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  private token: string;
  canActivate(): boolean {
    this.token = localStorage.getItem('token');
    return !!this.token;
  }
}
