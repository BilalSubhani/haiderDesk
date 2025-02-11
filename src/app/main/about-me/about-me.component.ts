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
  selector: 'app-about-me',
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent {
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  // About Me
  @ViewChild('aboutMeContainer', { static: false })
  aboutMeContainer!: ElementRef;
  @ViewChild('aboutMeHeadline', { static: false }) aboutMeHeadline!: ElementRef;
  @ViewChild('introContainer', { static: false }) introContainer!: ElementRef;
  @ViewChild('introHeading', { static: false }) introHeading!: ElementRef;
  @ViewChild('introText', { static: false }) introText!: ElementRef;
  @ViewChild('statsContainer', { static: false }) statsContainer!: ElementRef;
  @ViewChild('statsNumber', { static: false }) statsNumber!: ElementRef;
  @ViewChild('statsText', { static: false }) statsText!: ElementRef;
  @ViewChild('experienceContainer', { static: false })
  experienceContainer!: ElementRef;
  @ViewChild('experienceNumber', { static: false })
  experienceNumber!: ElementRef;
  @ViewChild('experienceText', { static: false }) experienceText!: ElementRef;
  @ViewChild('viewsContainer', { static: false }) viewsContainer!: ElementRef;
  @ViewChild('viewsNumber', { static: false }) viewsNumber!: ElementRef;
  @ViewChild('viewsText', { static: false }) viewsText!: ElementRef;
  @ViewChild('visionContainer', { static: false }) visionContainer!: ElementRef;
  @ViewChild('visionText', { static: false }) visionText!: ElementRef;
  @ViewChild('portfolioContainer', { static: false })
  portfolioContainer!: ElementRef;
  @ViewChild('portfolioText', { static: false }) portfolioText!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        // About Me
        const observerAMHeadline = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.aboutMeHeadline.nativeElement, 'show');
            });
          },
          { threshold: 0.1 }
        );

        const observerAMCont12 = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.introContainer.nativeElement, 'show');
              this.renderer[action](this.statsContainer.nativeElement, 'show');
              this.renderer[action](this.introHeading.nativeElement, 'show');
              this.renderer[action](this.statsNumber.nativeElement, 'show');
            });
          },
          { threshold: 0.2 }
        );
        const observerIntroText = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.introText.nativeElement, 'show');
              this.renderer[action](this.statsText.nativeElement, 'show');
              this.renderer[action](
                this.experienceContainer.nativeElement,
                'show'
              );
              this.renderer[action](this.visionContainer.nativeElement, 'show');
            });
          },
          { threshold: 0.4 }
        );

        const observerExperience = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.experienceText.nativeElement, 'show');
              this.renderer[action](
                this.experienceNumber.nativeElement,
                'show'
              );
            });
          },
          { threshold: 0.1 }
        );

        const observerVisionCont = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.visionContainer.nativeElement, 'show');
            });
          },
          { threshold: 0.1 }
        );

        const observerVisionText = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.visionText.nativeElement, 'show');
              this.renderer[action](
                this.portfolioContainer.nativeElement,
                'show'
              );
              this.renderer[action](this.viewsContainer.nativeElement, 'show');
            });
          },
          { threshold: 0.1 }
        );

        const observerPVText = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.viewsText.nativeElement, 'show');
              this.renderer[action](this.portfolioText.nativeElement, 'show');
              this.renderer[action](this.viewsNumber.nativeElement, 'show');
            });
          },
          { threshold: 0.3 }
        );
        observerAMHeadline.observe(this.aboutMeContainer.nativeElement);
        observerAMCont12.observe(this.aboutMeContainer.nativeElement);
        observerIntroText.observe(this.introContainer.nativeElement);
        observerExperience.observe(this.experienceContainer.nativeElement);
        observerVisionCont.observe(this.visionContainer.nativeElement);
        observerVisionText.observe(this.visionContainer.nativeElement);
        observerPVText.observe(this.portfolioContainer.nativeElement);
      } else {
        console.warn(
          'IntersectionObserver is not supported in this environment.'
        );
      }
    }
  }
}
