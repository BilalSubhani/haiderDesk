import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Observable, switchMap, map } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  sendEmails(emailBody: any): Observable<any> {
    return this.sharedService.getAllEmails().pipe(
      map((response) => response.map((item) => item.email)),
      switchMap((emailAddresses) => {
        const emailData = {
          to: emailAddresses,
          subject: emailBody.subject,
          emailBody: emailBody.body,
        };
        return this.http.post(`${this.apiUrl}/send-email`, emailData);
      })
    );
  }
}
