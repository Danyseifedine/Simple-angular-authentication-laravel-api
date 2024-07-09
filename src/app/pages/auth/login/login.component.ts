import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../core/services/api/data.service';
import { ShowToast } from '../../../shared/utils/toast';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  response: any;


  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private showToast: ShowToast,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }


  get emailHasError(): any {
    return this.loginForm.get('email')?.errors;
  }

  get passwordHasError(): any {
    return this.loginForm.get('password')?.errors;
  }

  getEmailErrorMessage(): string {
    if (this.emailHasError?.['required']) {
      return 'Email is required';
    }
    if (this.emailHasError?.['email']) {
      return 'Email is invalid';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    if (this.passwordHasError?.['required']) {
      return 'Password is required';
    }
    if (this.passwordHasError?.['minlength']) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  }



  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const formData = this.loginForm.value;

    this.dataService.loginRequest(formData).subscribe(
      (response) => {

        this.showToast.success('Successfully logged in! You can now start using the app.');
        this.loading = false;

        this.response = response;

        localStorage.setItem('authToken', this.response.token);
        localStorage.setItem('user', JSON.stringify(this.response.user));
        this.userService.setUser(this.response.user);
        this.router.navigate(['dashboard'])
      },
      (error) => {
        if (error.status === 401) {
          this.showToast.error('The credentials you entered are invalid. Please make sure you have the correct email and password, and try again.')
        }
        this.loading = false;
      }
    );
  }
}
