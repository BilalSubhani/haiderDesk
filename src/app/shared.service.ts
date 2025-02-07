import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface LogoDetail {
  id: number;
  name: string;
  originalPrice?: number;
  salePrice: number;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private imageSource = new BehaviorSubject<string | null>(null);
  image$ = this.imageSource.asObservable();

  private sectionSource = new BehaviorSubject<string | null>(null);
  section$ = this.sectionSource.asObservable();

  updateImage(imageUrl: string) {
    this.imageSource.next(imageUrl);
  }

  updateSection(sectionStrin: string) {
    this.sectionSource.next(sectionStrin);
  }

  private defaultLogo: LogoDetail = {
    id: 0,
    name: '',
    originalPrice: 0,
    salePrice: 0,
    description: '',
    image: '',
  };

  private logoDetailSubject = new BehaviorSubject<LogoDetail>(this.defaultLogo);
  public logoDetail$: Observable<LogoDetail> =
    this.logoDetailSubject.asObservable();

  setLogoDetail(logo: LogoDetail): void {
    this.logoDetailSubject.next(logo);
  }

  getCurrentLogoDetail(): LogoDetail {
    return this.logoDetailSubject.getValue();
  }
}
