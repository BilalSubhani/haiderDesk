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
  selector: 'app-logo',
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
})
export class LogoComponent {
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  // Logo Store
  @ViewChild('storeContainer', { static: false }) storeContainer!: ElementRef;
  @ViewChild('storeLogo', { static: false }) storeLogo!: ElementRef;
  @ViewChild('storeHeadline', { static: false }) storeHeadline!: ElementRef;
  @ViewChild('storeText', { static: false }) storeText!: ElementRef;
  @ViewChild('storeButton', { static: false }) storeButton!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        // Logo Store
        const observerStoreLogo = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.storeLogo.nativeElement, 'show');
            });
          },
          { threshold: 0.1 }
        );
        const observerStoreHeadline = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.storeHeadline.nativeElement, 'show');
            });
          },
          { threshold: 0.2 }
        );
        const observerStoreText = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.storeText.nativeElement, 'show');
            });
          },
          { threshold: 0.3 }
        );
        const observerStoreButton = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.storeButton.nativeElement, 'show');
            });
          },
          { threshold: 0.4 }
        );
        observerStoreLogo.observe(this.storeContainer.nativeElement);
        observerStoreHeadline.observe(this.storeContainer.nativeElement);
        observerStoreText.observe(this.storeContainer.nativeElement);
        observerStoreButton.observe(this.storeContainer.nativeElement);
      } else {
        console.warn(
          'IntersectionObserver is not supported in this environment.'
        );
      }
    }
  }
}
