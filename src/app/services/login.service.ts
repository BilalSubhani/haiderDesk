import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

interface LoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = environment.API_URL;
  private haiderDesk_token: string | null = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {
      email,
      password,
    });
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('haiderDesk_token');
    }
    return false;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('haiderDesk_token');
    }
    return null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('haiderDesk_token');
      this.router.navigate(['/login']);
    }
  }

  userDetails: any;

  getUserDetails() {
    return this.userDetails;
  }

  setUserDetails(email: string) {
    this.getAdminByEmail(email).subscribe({
      next: (data: { name: string; email: string }) => {
        this.userDetails = data;
      },
    });
  }

  getAdminByEmail(email: string): any {
    this.haiderDesk_token = localStorage.getItem('haiderDesk_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.haiderDesk_token}`,
    });

    return this.http.get<{ name: string; email: string }>(
      `${this.apiUrl}/admin/email/${email}`,
      {
        headers,
      }
    );
  }
}
