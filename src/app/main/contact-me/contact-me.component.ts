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
  selector: 'app-contact-me',
  imports: [CommonModule],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.css',
})
export class ContactMeComponent {
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}
  @ViewChild('contactContainer', { static: false })
  contactContainer!: ElementRef;
  @ViewChild('contactLogo', { static: false }) contactLogo!: ElementRef;
  @ViewChild('contactHeadline', { static: false }) contactHeadline!: ElementRef;
  @ViewChild('projectContainer', { static: false })
  projectContainer!: ElementRef;
  @ViewChild('projectHeadline', { static: false }) projectHeadline!: ElementRef;
  @ViewChild('projectText', { static: false }) projectText!: ElementRef;
  @ViewChild('formContainer', { static: false }) formContainer!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        // Contact Me
        const observerContactLogo = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.contactLogo.nativeElement, 'show');
            });
          },
          { threshold: 0.1 }
        );
        const observerContactHeadline = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.contactHeadline.nativeElement, 'show');
            });
          },
          { threshold: 0.2 }
        );
        const observerProjectContainer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](
                this.projectContainer.nativeElement,
                'show'
              );
            });
          },
          { threshold: 0.3 }
        );
        const observerProjectHeadline = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.projectHeadline.nativeElement, 'show');
            });
          },
          { threshold: 0.1 }
        );
        const observerProjectText = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.projectText.nativeElement, 'show');
            });
          },
          { threshold: 0.3 }
        );

        const observerForm = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.formContainer.nativeElement, 'show');
            });
          },
          { threshold: 0.3 }
        );

        observerContactLogo.observe(this.contactContainer.nativeElement);
        observerContactHeadline.observe(this.contactContainer.nativeElement);
        observerProjectContainer.observe(this.contactContainer.nativeElement);
        observerProjectHeadline.observe(this.projectContainer.nativeElement);
        observerProjectText.observe(this.projectContainer.nativeElement);
        observerForm.observe(this.contactContainer.nativeElement);
      } else {
        console.warn(
          'IntersectionObserver is not supported in this environment.'
        );
      }
    }
  }
}
