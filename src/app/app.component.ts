import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LightboxComponent } from './lightbox/lightbox.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LightboxComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private sharedService: SharedService
  ) {}

  @ViewChild('navbar', { static: true }) navbar!: ElementRef;
  private observer!: IntersectionObserver;

  ngOnInit() {
    this.sharedService.image$.subscribe((image) => {
      this.selectedImage = image;
      if (this.selectedImage) this.openLightbox();
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        window.addEventListener('scroll', this.onScroll.bind(this));
      }, 500);
    }
  }

  onScroll() {
    const scrollOffset = window.scrollY;
    const threshold = 100;

    if (this.navbar) {
      if (scrollOffset < threshold) {
        this.navbar.nativeElement.classList.add('expand');
      } else {
        this.navbar.nativeElement.classList.remove('expand');
      }
    }
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

  scrollToSection(comp: string) {
    this.sharedService.updateSection(comp);
    // if (comp === 'work') this.scrollToPosition(2800);
    // else if (comp === 'testimonial') this.scrollToPosition(4600);
    // else if (comp === 'about') this.scrollToPosition(5350);
    // else if (comp === 'contact') this.scrollToPosition(9750);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToPosition(px: number) {
    window.scrollTo({ top: px, behavior: 'smooth' });
  }
}
