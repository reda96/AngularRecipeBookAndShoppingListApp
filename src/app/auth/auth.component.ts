import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService) {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) return;
    let authObservable: Observable<AuthResponseData>;
    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.login(
        form.value.email,
        form.value.password
      );
    } else {
      authObservable = this.authService.signup(
        form.value.email,
        form.value.password
      );
    }
    authObservable.subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
        this.error = null;
      },
      (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
