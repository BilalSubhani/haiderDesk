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
  selector: 'app-features',
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css',
})
export class FeaturesComponent implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  // Features
  @ViewChild('featureSection1', { static: false }) featureSection1!: ElementRef;
  @ViewChild('featureSection2', { static: false }) featureSection2!: ElementRef;
  @ViewChild('featureSection3', { static: false }) featureSection3!: ElementRef;
  @ViewChild('featureText1', { static: false }) featureText1!: ElementRef;
  @ViewChild('featureText2', { static: false }) featureText2!: ElementRef;
  @ViewChild('featureGif', { static: false }) featureGif!: ElementRef;
  @ViewChild('featureGif1', { static: false }) featureGif1!: ElementRef;
  @ViewChild('featureGif2', { static: false }) featureGif2!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        // Features
        const observerText1 = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.featureText1.nativeElement, 'show');
            });
          },
          { threshold: 0.1 }
        );
        const observerText2 = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.featureText2.nativeElement, 'show');
            });
          },
          { threshold: 0.1 }
        );

        const observerGif = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.featureGif.nativeElement, 'show');
            });
          },
          { threshold: 0.1 }
        );

        const observerGif1 = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.featureGif1.nativeElement, 'show');
            });
          },
          { threshold: 0.1 }
        );

        const observerGif2 = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.featureGif2.nativeElement, 'show');
            });
          },
          { threshold: 0.1 }
        );

        observerText1.observe(this.featureSection1.nativeElement);
        observerText2.observe(this.featureSection2.nativeElement);
        observerGif.observe(this.featureSection1.nativeElement);
        observerGif1.observe(this.featureSection2.nativeElement);
        observerGif2.observe(this.featureSection3.nativeElement);
      } else {
        console.warn(
          'IntersectionObserver is not supported in this environment.'
        );
      }
    }
  }
}
