import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ToastrService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('haiderDesk_token');
    }
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        const result = await this.loginService
          .login(
            this.loginForm.get('email')?.value,
            this.loginForm.get('password')?.value
          )
          .toPromise();

        if (result && result.access_token) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('haiderDesk_token', result.access_token);
          }
          this.loginService.setUserDetails(this.loginForm.get('email')?.value);

          this.toastr.success(`Login Successful!`, 'Welcome!');
          this.router.navigate(['/cportal']);
        }
      } catch (error: any) {
        this.errorMessage =
          error.error?.message || 'Login failed. Please try again.';
        this.toastr.error(`${this.errorMessage}`, 'Login Failed!');
      } finally {
        this.isLoading = false;
      }
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.toastr.warning(`${this.errorMessage}`, 'Login Failed!');
    }
  }
}
