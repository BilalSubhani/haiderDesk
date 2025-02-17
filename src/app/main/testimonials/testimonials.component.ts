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
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
})
export class TestimonialsComponent {
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private sharedService: SharedService
  ) {}

  // Testimonials
  @ViewChild('testimonialsContainer', { static: false })
  testimonialsContainer!: ElementRef;
  @ViewChild('testHeadline', { static: false }) testHeadline!: ElementRef;
  @ViewChild('test1', { static: false }) test1!: ElementRef;
  @ViewChild('test2', { static: false }) test2!: ElementRef;
  @ViewChild('test3', { static: false }) test3!: ElementRef;
  @ViewChild('test4', { static: false }) test4!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        // Testimonials
        const observerTestHeadline = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.testHeadline.nativeElement, 'show');

              if (entry.isIntersecting) {
                obs.disconnect();
              }
            });
          },
          { threshold: 0.1 }
        );

        const observerTest12 = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.test1.nativeElement, 'show');
              this.renderer[action](this.test2.nativeElement, 'show');

              if (entry.isIntersecting) {
                obs.disconnect();
              }
            });
          },
          { threshold: 0.2 }
        );

        const observerTest34 = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.test3.nativeElement, 'show');
              this.renderer[action](this.test4.nativeElement, 'show');

              if (entry.isIntersecting) {
                obs.disconnect();
              }
            });
          },
          { threshold: 0.4 }
        );
        observerTestHeadline.observe(this.testimonialsContainer.nativeElement);
        observerTest12.observe(this.testimonialsContainer.nativeElement);
        observerTest34.observe(this.testimonialsContainer.nativeElement);
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
