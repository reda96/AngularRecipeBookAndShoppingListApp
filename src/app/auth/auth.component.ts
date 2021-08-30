import {
  Component,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AlertComponent } from '../shared/alert/alert.component';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error = null;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  closeSub: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
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
        this.router.navigate(['/recipes']);
      },
      (err) => {
        console.log(err);
        this.error = err;
        this.showErrorMessage(err);
        this.isLoading = false;
      }
    );
    form.reset();
  }
  onHandleError() {
    this.error = null;
  }
  private showErrorMessage(message: string) {
    const alertcmp =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertcmp);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.closeSub) this.closeSub.unsubscribe();
  }
}
