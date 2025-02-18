import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private apiUrl = environment.API_URL;

  private imageSource = new BehaviorSubject<string | null>(null);
  image$ = this.imageSource.asObservable();

  private sectionSource = new BehaviorSubject<string | null>(null);
  section$ = this.sectionSource.asObservable();

  private logoDetailSubject = new BehaviorSubject<any>({});
  public logoDetail$: Observable<any> = this.logoDetailSubject.asObservable();

  private logoSource = new BehaviorSubject<any[]>([]);
  public allLogos$: Observable<any[]> = this.logoSource.asObservable();

  private emailSource = new BehaviorSubject<any[]>([]);
  public allEmails$: Observable<any[]> = this.emailSource.asObservable();

  constructor(private http: HttpClient) {}

  updateImage(imageUrl: string) {
    this.imageSource.next(imageUrl);
  }

  updateSection(sectionString: string) {
    this.sectionSource.next(sectionString);
  }

  setLogoDetail(logo: any): void {
    this.logoDetailSubject.next(logo);
  }

  getCurrentLogoDetail(): any {
    return this.logoDetailSubject.getValue();
  }

  // Logo API Methods
  getAllLogos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/logo`);
  }

  getLogoById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/logo/${id}`);
  }

  addLogo(logo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logo`, logo);
  }

  updateLogo(id: string, logo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/logo/${id}`, logo);
  }

  deleteLogo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/logo/${id}`);
  }

  // Email API Methods
  getAllEmails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/email`);
  }

  getEmailById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/email/${id}`);
  }

  addEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/email`, { email });
  }

  updateEmail(id: string, email: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/email/${id}`, { email });
  }

  deleteEmail(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/email/${id}`);
  }
}
