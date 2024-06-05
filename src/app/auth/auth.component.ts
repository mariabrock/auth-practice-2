import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  inLoginMode = true;
  isLoading = false;
  error: string = null!;

  constructor(private authService: AuthService,
              private router: Router) {}

  onSwitch() {
    this.inLoginMode = !this.inLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password)

    let authObservable: Observable<AuthResponseData>;
    // in order to not repeat our code, we make a new observable

    this.isLoading = true;

    if (this.inLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signup(email, password);
    }

    authObservable.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (errorMessage) => {
        console.error(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      },
    });
    // the subscriptions for login and sign up now line in their own observable => authObservable
    // because we are doing the same things on login and sign up we simply reference the observable
    // this helps us to control loading state and set any errors
    form.reset();
  }

}
