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
  selector: 'app-brand-guide',
  imports: [CommonModule],
  templateUrl: './brand-guide.component.html',
  styleUrl: './brand-guide.component.css',
})
export class BrandGuideComponent {
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  // Brands Guideline
  @ViewChild('guideContainer', { static: false }) guideContainer!: ElementRef;
  @ViewChild('guideImageContainer', { static: false })
  guideImageContainer!: ElementRef;
  @ViewChild('guideLogo', { static: false }) guideLogo!: ElementRef;
  @ViewChild('guideHeadline', { static: false }) guideHeadline!: ElementRef;
  @ViewChild('guideText', { static: false }) guideText!: ElementRef;
  @ViewChild('guideButton', { static: false }) guideButton!: ElementRef;
  @ViewChild('guideImage', { static: false }) guideImage!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        // Brands Guidelines
        const observerGuideLogo = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(this.guideLogo.nativeElement, 'show');
                obs.disconnect();
              }
            });
          },
          { threshold: 0.1 }
        );

        const observerGuideHeadline = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(
                  this.guideHeadline.nativeElement,
                  'show'
                );
                obs.disconnect();
              }
            });
          },
          { threshold: 0.2 }
        );

        const observerGuideText = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(this.guideText.nativeElement, 'show');
                obs.disconnect();
              }
            });
          },
          { threshold: 0.3 }
        );

        const observerGuideButton = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(this.guideButton.nativeElement, 'show');
                obs.disconnect();
              }
            });
          },
          { threshold: 0.4 }
        );

        const observerGuideImage = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(this.guideImage.nativeElement, 'show');
                obs.disconnect();
              }
            });
          },
          { threshold: 0.3 }
        );
        observerGuideLogo.observe(this.guideContainer.nativeElement);
        observerGuideHeadline.observe(this.guideContainer.nativeElement);
        observerGuideText.observe(this.guideContainer.nativeElement);
        observerGuideButton.observe(this.guideContainer.nativeElement);
        observerGuideImage.observe(this.guideImageContainer.nativeElement);
      } else {
        console.warn(
          'IntersectionObserver is not supported in this environment.'
        );
      }
    }
  }
}
