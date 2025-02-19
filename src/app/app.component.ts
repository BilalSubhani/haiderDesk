import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LightboxComponent } from './pages/lightbox/lightbox.component';
import { CommonModule } from '@angular/common';
import { SharedService } from './services/shared.service';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LightboxComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  constructor(
    private sharedService: SharedService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.analyticsService.trackVisit();
    this.sharedService.image$.subscribe((image) => {
      this.selectedImage = image;
      if (this.selectedImage) this.openLightbox();
    });
  }

  selectedImage: any;
  lightboxOpen: boolean = false;

  openLightbox() {
    this.lightboxOpen = true;
  }

  receiveLightBoxEvent(event: any) {
    this.lightboxOpen = event;
  }
}
