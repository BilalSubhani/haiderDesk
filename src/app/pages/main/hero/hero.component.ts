import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  // Herosection
  @ViewChild('heroSection', { static: false }) heroSection!: ElementRef;
  @ViewChild('headline', { static: false }) headline!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        const observerHeadline = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.headline.nativeElement, 'show');

              if (entry.isIntersecting) {
                obs.disconnect();
              }
            });
          },
          { threshold: 0.1 }
        );

        observerHeadline.observe(this.heroSection.nativeElement);
      } else {
        console.warn(
          'IntersectionObserver is not supported in this environment.'
        );
      }
    }
  }

  customLogoRequest() {
    this.router.navigate(['/custom-logo']);
  }
}
