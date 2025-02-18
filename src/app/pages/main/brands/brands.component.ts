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
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-brands',
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private sharedService: SharedService
  ) {}

  // Brands
  @ViewChild('brandsContainer', { static: false })
  brandsContainer!: ElementRef;
  @ViewChild('brandsGridContainer', { static: false })
  brandsGridContainer!: ElementRef;
  @ViewChild('brandsLogo', { static: false }) brandsLogo!: ElementRef;
  @ViewChild('brandsheadline', { static: false }) brandsheadline!: ElementRef;
  @ViewChild('brandsText', { static: false }) brandsText!: ElementRef;
  @ViewChild('brandsButton', { static: false }) brandsButton!: ElementRef;
  @ViewChild('brand1', { static: false }) brand1!: ElementRef;
  @ViewChild('brand2', { static: false }) brand2!: ElementRef;
  @ViewChild('brand3', { static: false }) brand3!: ElementRef;
  @ViewChild('brand4', { static: false }) brand4!: ElementRef;
  @ViewChild('brand5', { static: false }) brand5!: ElementRef;
  @ViewChild('brand6', { static: false }) brand6!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        // Brands
        const observerBrandLogo = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(this.brandsLogo.nativeElement, 'show');
                obs.disconnect();
              }
            });
          },
          { threshold: 0.1 }
        );

        const observerBrandHeadline = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(
                  this.brandsheadline.nativeElement,
                  'show'
                );
                obs.disconnect();
              }
            });
          },
          { threshold: 0.2 }
        );

        const observerBrandText = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(this.brandsText.nativeElement, 'show');
                obs.disconnect();
              }
            });
          },
          { threshold: 0.3 }
        );

        const observerBrandButton = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(this.brandsButton.nativeElement, 'show');
                obs.disconnect();
              }
            });
          },
          { threshold: 0.1 }
        );

        const observerBrandRow1 = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(this.brand1.nativeElement, 'show');
                this.renderer.addClass(this.brand2.nativeElement, 'show');
                this.renderer.addClass(this.brand3.nativeElement, 'show');
                obs.disconnect();
              }
            });
          },
          { threshold: 0.1 }
        );

        const observerBrandRow2 = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(this.brand4.nativeElement, 'show');
                this.renderer.addClass(this.brand5.nativeElement, 'show');
                this.renderer.addClass(this.brand6.nativeElement, 'show');
                obs.disconnect();
              }
            });
          },
          { threshold: 0.3 }
        );

        observerBrandLogo.observe(this.brandsContainer.nativeElement);
        observerBrandHeadline.observe(this.brandsContainer.nativeElement);
        observerBrandText.observe(this.brandsContainer.nativeElement);
        observerBrandButton.observe(this.brandsContainer.nativeElement);
        observerBrandRow1.observe(this.brandsGridContainer.nativeElement);
        observerBrandRow2.observe(this.brandsGridContainer.nativeElement);
      } else {
        console.warn(
          'IntersectionObserver is not supported in this environment.'
        );
      }
    }
  }

  emitImageSrc(src: any) {
    this.sharedService.updateImage(src);
  }
}
