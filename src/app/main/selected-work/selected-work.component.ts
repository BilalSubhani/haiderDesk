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
  selector: 'app-selected-work',
  imports: [CommonModule],
  templateUrl: './selected-work.component.html',
  styleUrl: './selected-work.component.css',
})
export class SelectedWorkComponent {
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  // Selected Work
  @ViewChild('selectedWorkHeadline', { static: false })
  selectedWorkHeadline!: ElementRef;
  @ViewChild('selectedWorkContainer', { static: false })
  selectedWorkContainer!: ElementRef;
  @ViewChild('selectedWork34Container', { static: false })
  selectedWork34Container!: ElementRef;
  @ViewChild('selectedWork56Container', { static: false })
  selectedWork56Container!: ElementRef;
  @ViewChild('work1', { static: false }) work1!: ElementRef;
  @ViewChild('work2', { static: false }) work2!: ElementRef;
  @ViewChild('work3', { static: false }) work3!: ElementRef;
  @ViewChild('work4', { static: false }) work4!: ElementRef;
  @ViewChild('work5', { static: false }) work5!: ElementRef;
  @ViewChild('work6', { static: false }) work6!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        // Selected Work
        const observerSWHeadline = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](
                this.selectedWorkHeadline.nativeElement,
                'show'
              );

              if (entry.isIntersecting) {
                obs.disconnect();
              }
            });
          },
          { threshold: 0.1 }
        );

        const observerSW1 = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.work1.nativeElement, 'show');
              this.renderer[action](this.work2.nativeElement, 'show');

              if (entry.isIntersecting) {
                obs.disconnect();
              }
            });
          },
          { threshold: 0.2 }
        );
        const observerSW2 = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.work3.nativeElement, 'show');
              this.renderer[action](this.work4.nativeElement, 'show');

              if (entry.isIntersecting) {
                obs.disconnect();
              }
            });
          },
          { threshold: 0.5 }
        );
        const observerSW3 = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.work5.nativeElement, 'show');
              this.renderer[action](this.work6.nativeElement, 'show');

              if (entry.isIntersecting) {
                obs.disconnect();
              }
            });
          },
          { threshold: 0.2 }
        );

        observerSWHeadline.observe(this.selectedWorkContainer.nativeElement);
        observerSW1.observe(this.selectedWorkContainer.nativeElement);
        observerSW2.observe(this.selectedWork34Container.nativeElement);
        observerSW3.observe(this.selectedWork56Container.nativeElement);
      } else {
        console.warn(
          'IntersectionObserver is not supported in this environment.'
        );
      }
    }
  }
}
