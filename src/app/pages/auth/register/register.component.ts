import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { DataService } from '../../../core/services/api/data.service';
import { ShowToast } from '../../../shared/utils/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  response: any;


  constructor(
    private formBuilder: FormBuilder,
    private showToast: ShowToast,
    private dataService: DataService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({

      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]

    });

    if (localStorage.getItem('authToken')) {
      this.router.navigate(['dashboard']);
    }
  }

  get nameHasError(): any {
    return this.registerForm.get('name')?.errors;
  }

  get emailHasError(): any {
    return this.registerForm.get('email')?.errors;
  }

  get passwordHasError(): any {
    return this.registerForm.get('password')?.errors;
  }

  getNameErrorMessage(): string {
    if (this.nameHasError?.['required']) {
      return 'Name is required';
    }
    return '';
  }

  getEmailErrorMessage(): string {
    if (this.emailHasError?.['required']) {
      return 'Email is required';
    }
    if (this.emailHasError?.['email']) {
      return 'Email is invalid';
    }
    if (this.emailHasError?.['emailTaken']) {
      return 'Email already taken';
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

    if (this.registerForm.invalid) {
      return;
    }

    const formData = this.registerForm.value;
    this.loading = true;
    this.dataService.registerRequest(formData).subscribe(
      (response) => {
        this.showToast.success('Registration successful!');
        this.response = response;

        localStorage.setItem('authToken', this.response.token);
        localStorage.setItem('user', JSON.stringify(this.response.user));
        this.router.navigate(['dashboard'])
        this.loading = false;
      },
      (error) => {
        if (error.error && error.error.message) {
          this.showToast.error(error.error.message);
        }
        this.loading = false;
      }
    );
  }
}
