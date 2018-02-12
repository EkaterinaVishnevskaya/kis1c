import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {User} from "./user";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  passwordsAreSame = true;
  directions: string[] = ['CP', 'ERP'];
  courses: number[] = [3, 4, 5, 6, 7, 8, 9];
  defaultCourse = 3;
  defaultDirection = 'CP';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      'surename': ['', [Validators.required]],
      'name': ['', [Validators.required]],
      'patronymic': ['', Validators.required],
      'course': '',
      'direction': '',
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'confirm': ['', [Validators.required]]
    });
    this.signupForm.controls['direction'].setValue(this.defaultDirection, {onlySelf: true});
    this.signupForm.controls['course'].setValue(this.defaultCourse, {onlySelf: true});
  }

  onSubmit() {
    console.log('submit');
    if (this.signupForm.value.password === this.signupForm.value.confirm) {
      this.passwordsAreSame = true;
      const formValue = this.signupForm.value;
      const user: User = new User(formValue.surename, formValue.name, formValue.patronymic, formValue.course,
        formValue.direction, formValue.email, formValue.password);
      this.authService.signUp(user).subscribe(
        res => {
          console.log('yahooo!!!');
          if (res.ok) {
            this.router.navigate(['sign-in']);
          }
        }, err => {
          console.log('error occured');
        }
      );
    } else {
      this.passwordsAreSame = false;
    }
  }
}
