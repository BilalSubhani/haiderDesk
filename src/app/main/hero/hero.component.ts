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

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Herosection
  @ViewChild('navbar', { static: false }) navbar!: ElementRef;
  @ViewChild('heroSection', { static: false }) heroSection!: ElementRef;
  @ViewChild('headline', { static: false }) headline!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        const observerNavbar = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.navbar.nativeElement, 'expand');
            });
          },
          { threshold: 0.8 }
        );

        const observerHeadline = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.headline.nativeElement, 'show');
            });
          },
          { threshold: 0.1 }
        );

        observerNavbar.observe(this.heroSection.nativeElement);
        observerHeadline.observe(this.heroSection.nativeElement);
      } else {
        console.warn(
          'IntersectionObserver is not supported in this environment.'
        );
      }
    }
  }
}
