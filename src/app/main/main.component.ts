import { Component, ElementRef, ViewChild } from '@angular/core';

// Components
import { HeroComponent } from './hero/hero.component';
import { FeaturesComponent } from './features/features.component';
import { SelectedWorkComponent } from './selected-work/selected-work.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { BrandsComponent } from './brands/brands.component';
import { LogoComponent } from './logo/logo.component';
import { BrandGuideComponent } from './brand-guide/brand-guide.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { FooterComponent } from './footer/footer.component';

// Service
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-main',
  imports: [
    TestimonialsComponent,
    HeroComponent,
    FeaturesComponent,
    SelectedWorkComponent,
    AboutMeComponent,
    BrandGuideComponent,
    BrandsComponent,
    LogoComponent,
    ContactMeComponent,
    FooterComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  constructor(private sharedService: SharedService) {}

  @ViewChild('testimonialsContainer', { static: false })
  testimonialsContainer!: ElementRef;
  @ViewChild('aboutMeContainer', { static: false })
  aboutMeContainer!: ElementRef;
  @ViewChild('contactContainer', { static: false })
  contactContainer!: ElementRef;
  @ViewChild('workContainer', { static: false }) workContainer!: ElementRef;

  sectionString: any;

  ngOnInit() {
    this.sharedService.section$.subscribe((sec) => {
      this.sectionString = sec;
      if (this.sectionString) {
        setTimeout(() => this.sectionViewChild(), 100);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.sectionString) this.sectionViewChild();
    }, 200);
  }

  sectionViewChild() {
    let targetElement: ElementRef | undefined;

    switch (this.sectionString) {
      case 'work':
        targetElement = this.workContainer;
        break;
      case 'testimonial':
        targetElement = this.testimonialsContainer;
        break;
      case 'about':
        targetElement = this.aboutMeContainer;
        break;
      case 'contact':
        targetElement = this.contactContainer;
        break;
      default:
        console.warn('Invalid section:', this.sectionString);
        return;
    }

    if (targetElement?.nativeElement) {
      this.smoothScroll(targetElement.nativeElement);
    } else {
      console.warn(`Element for section '${this.sectionString}' not found.`);
    }
  }

  smoothScroll(target: HTMLElement) {
    const startPosition = window.scrollY;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const distance = targetPosition - startPosition;
    const speed = 0.8;
    const duration = Math.min(Math.abs(distance) * speed, 2500);
    let startTime: number | null = null;

    function animationStep(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const easeInOutQuad =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, startPosition + distance * easeInOutQuad);

      if (elapsedTime < duration) {
        requestAnimationFrame(animationStep);
      }
    }

    requestAnimationFrame(animationStep);
  }
}
