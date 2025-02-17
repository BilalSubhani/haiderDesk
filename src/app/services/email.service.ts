import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Observable, switchMap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  sendEmails(emailBody: any): Observable<any> {
    return this.sharedService.getAllEmails().pipe(
      map((response) => response.map((item) => item.email)),
      switchMap((emailAddresses) => {
        const emailData = {
          to: emailAddresses,
          subject: 'New Order Received',
          emailBody: emailBody,
        };
        return this.http.post(`${this.apiUrl}/send-email`, emailData);
      })
    );
  }
}
