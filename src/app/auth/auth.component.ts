import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/place-holder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isFethching = false;
  closeSub: Subscription;
  // error: string | null = null;
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    form.reset();

    let authObs : Observable<AuthResponseData>;
    this.isFethching = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email,password);
    } else {
      authObs = this.authService.signUp(email, password);
      
    }
    authObs.subscribe(
      (data) => {
        this.isFethching = false;
        this.router.navigate(['/recipes'])
      },
      (errMessage) => {
        // this.error = errMessage;
        this.showErrorAlert(errMessage);
        this.isFethching = false;
      }
    );
  }
  // onAlert() {
  //   this.error = null;
  // }
  private showErrorAlert(errMessage: string) {
    this.alertHost.viewContainerRef.clear();
    const alertComponentRef = this.alertHost.viewContainerRef.createComponent(AlertComponent);
    alertComponentRef.instance.message = errMessage;
    this.closeSub = alertComponentRef.instance.close.pipe(take(1)).subscribe(() => {
      this.alertHost.viewContainerRef.clear();
    })
  }

  ngOnDestroy(): void {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

}
