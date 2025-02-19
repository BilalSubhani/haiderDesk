import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private apiUrl = environment.API_URL + '/analytics';

  constructor(private http: HttpClient) {}

  trackVisit() {
    return this.http.post(`${this.apiUrl}/visit`, {}).subscribe();
  }

  getVisitCount() {
    return this.http.get<{ visits: number }>(`${this.apiUrl}/visits`);
  }
}
