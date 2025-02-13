import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LightboxComponent } from './lightbox/lightbox.component';
import { CommonModule } from '@angular/common';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LightboxComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private sharedService: SharedService) {}

  private observer!: IntersectionObserver;

  ngOnInit() {
    this.sharedService.image$.subscribe((image) => {
      this.selectedImage = image;
      if (this.selectedImage) this.openLightbox();
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
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
