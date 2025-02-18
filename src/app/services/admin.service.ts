import { isPlatformBrowser } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getHeaders(): HttpHeaders {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('haiderDesk_token');
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    }
    return new HttpHeaders();
  }

  getAllAdmins(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin`, {
      headers: this.getHeaders(),
    });
  }

  createAdmin(adminData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin`, adminData, {
      headers: this.getHeaders(),
    });
  }

  deleteAdmin(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
