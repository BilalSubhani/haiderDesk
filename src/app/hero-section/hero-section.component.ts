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
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  standalone: true,
})
export class HeroSectionComponent implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private sharedService: SharedService
  ) {}

  // Herosection
  @ViewChild('navbar', { static: false }) navbar!: ElementRef;
  @ViewChild('heroSection', { static: false }) heroSection!: ElementRef;
  @ViewChild('headline', { static: false }) headline!: ElementRef;

  // Features
  @ViewChild('featureSection1', { static: false }) featureSection1!: ElementRef;
  @ViewChild('featureSection2', { static: false }) featureSection2!: ElementRef;
  @ViewChild('featureSection3', { static: false }) featureSection3!: ElementRef;
  @ViewChild('featureText1', { static: false }) featureText1!: ElementRef;
  @ViewChild('featureText2', { static: false }) featureText2!: ElementRef;
  @ViewChild('featureGif', { static: false }) featureGif!: ElementRef;
  @ViewChild('featureGif1', { static: false }) featureGif1!: ElementRef;
  @ViewChild('featureGif2', { static: false }) featureGif2!: ElementRef;

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

  // Testimonials
  @ViewChild('testimonialsContainer', { static: false })
  testimonialsContainer!: ElementRef;
  @ViewChild('testHeadline', { static: false }) testHeadline!: ElementRef;
  @ViewChild('test1', { static: false }) test1!: ElementRef;
  @ViewChild('test2', { static: false }) test2!: ElementRef;
  @ViewChild('test3', { static: false }) test3!: ElementRef;
  @ViewChild('test4', { static: false }) test4!: ElementRef;

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

  // Logo Store
  @ViewChild('storeContainer', { static: false }) storeContainer!: ElementRef;
  @ViewChild('storeLogo', { static: false }) storeLogo!: ElementRef;
  @ViewChild('storeHeadline', { static: false }) storeHeadline!: ElementRef;
  @ViewChild('storeText', { static: false }) storeText!: ElementRef;
  @ViewChild('storeButton', { static: false }) storeButton!: ElementRef;

  // Brands Guideline
  @ViewChild('guideContainer', { static: false }) guideContainer!: ElementRef;
  @ViewChild('guideImageContainer', { static: false })
  guideImageContainer!: ElementRef;
  @ViewChild('guideLogo', { static: false }) guideLogo!: ElementRef;
  @ViewChild('guideHeadline', { static: false }) guideHeadline!: ElementRef;
  @ViewChild('guideText', { static: false }) guideText!: ElementRef;
  @ViewChild('guideButton', { static: false }) guideButton!: ElementRef;
  @ViewChild('guideImage', { static: false }) guideImage!: ElementRef;

  // Contact Me
  @ViewChild('contactContainer', { static: false })
  contactContainer!: ElementRef;
  @ViewChild('contactLogo', { static: false }) contactLogo!: ElementRef;
  @ViewChild('contactHeadline', { static: false }) contactHeadline!: ElementRef;
  @ViewChild('projectContainer', { static: false })
  projectContainer!: ElementRef;
  @ViewChild('projectHeadline', { static: false }) projectHeadline!: ElementRef;
  @ViewChild('projectText', { static: false }) projectText!: ElementRef;
  @ViewChild('formContainer', { static: false }) formContainer!: ElementRef;

  // Footer
  @ViewChild('footerContainer', { static: false }) footerContainer!: ElementRef;
  @ViewChild('footerData', { static: false }) footerData!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        // Hero section
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

        // Selected Work
        const observerSWHeadline = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](
                this.selectedWorkHeadline.nativeElement,
                'show'
              );
            });
          },
          { threshold: 0.1 }
        );

        const observerSW1 = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.work1.nativeElement, 'show');
              this.renderer[action](this.work2.nativeElement, 'show');
            });
          },
          { threshold: 0.2 }
        );
        const observerSW2 = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.work3.nativeElement, 'show');
              this.renderer[action](this.work4.nativeElement, 'show');
            });
          },
          { threshold: 0.5 }
        );
        const observerSW3 = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.work5.nativeElement, 'show');
              this.renderer[action](this.work6.nativeElement, 'show');
            });
          },
          { threshold: 0.2 }
        );

        // Testimonials
        const observerTestHeadline = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.testHeadline.nativeElement, 'show');
            });
          },
          { threshold: 0.1 }
        );

        const observerTest12 = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.test1.nativeElement, 'show');
              this.renderer[action](this.test2.nativeElement, 'show');
            });
          },
          { threshold: 0.3 }
        );

        const observerTest34 = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.test3.nativeElement, 'show');
              this.renderer[action](this.test4.nativeElement, 'show');
            });
          },
          { threshold: 0.5 }
        );

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

        // Brands
        const observerBrandLogo = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.brandsLogo.nativeElement, 'show');
            });
          },
          { threshold: 0.1 }
        );
        const observerBrandHeadline = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.brandsheadline.nativeElement, 'show');
            });
          },
          { threshold: 0.2 }
        );
        const observerBrandText = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.brandsText.nativeElement, 'show');
            });
          },
          { threshold: 0.3 }
        );
        const observerBrandButton = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.brandsButton.nativeElement, 'show');
            });
          },
          { threshold: 0.4 }
        );

        const observerBrandRow1 = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.brand1.nativeElement, 'show');
              this.renderer[action](this.brand2.nativeElement, 'show');
              this.renderer[action](this.brand3.nativeElement, 'show');
            });
          },
          { threshold: 0.1 }
        );
        const observerBrandRow2 = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.brand4.nativeElement, 'show');
              this.renderer[action](this.brand5.nativeElement, 'show');
              this.renderer[action](this.brand6.nativeElement, 'show');
            });
          },
          { threshold: 0.3 }
        );

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

        // Brands Guidelines
        const observerGuideLogo = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.guideLogo.nativeElement, 'show');
            });
          },
          { threshold: 0.1 }
        );
        const observerGuideHeadline = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.guideHeadline.nativeElement, 'show');
            });
          },
          { threshold: 0.2 }
        );
        const observerGuideText = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.guideText.nativeElement, 'show');
            });
          },
          { threshold: 0.3 }
        );
        const observerGuideButton = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.guideButton.nativeElement, 'show');
            });
          },
          { threshold: 0.4 }
        );
        const observerGuideImage = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.guideImage.nativeElement, 'show');
            });
          },
          { threshold: 0.3 }
        );

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

        // Footer
        const observerFooter = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const action = entry.isIntersecting ? 'addClass' : 'removeClass';
              this.renderer[action](this.footerData.nativeElement, 'show');
            });
          },
          { threshold: 0.3 }
        );
        // -----------------------------------------------------------------------------------------

        observerNavbar.observe(this.heroSection.nativeElement);
        observerHeadline.observe(this.heroSection.nativeElement);

        observerText1.observe(this.featureSection1.nativeElement);
        observerText2.observe(this.featureSection2.nativeElement);
        observerGif.observe(this.featureSection1.nativeElement);
        observerGif1.observe(this.featureSection2.nativeElement);
        observerGif2.observe(this.featureSection3.nativeElement);

        observerSWHeadline.observe(this.selectedWorkContainer.nativeElement);
        observerSW1.observe(this.selectedWorkContainer.nativeElement);
        observerSW2.observe(this.selectedWork34Container.nativeElement);
        observerSW3.observe(this.selectedWork56Container.nativeElement);

        observerTestHeadline.observe(this.testimonialsContainer.nativeElement);
        observerTest12.observe(this.testimonialsContainer.nativeElement);
        observerTest34.observe(this.testimonialsContainer.nativeElement);

        observerAMHeadline.observe(this.aboutMeContainer.nativeElement);
        observerAMCont12.observe(this.aboutMeContainer.nativeElement);
        observerIntroText.observe(this.introContainer.nativeElement);
        observerExperience.observe(this.experienceContainer.nativeElement);
        observerVisionCont.observe(this.visionContainer.nativeElement);
        observerVisionText.observe(this.visionContainer.nativeElement);
        observerPVText.observe(this.portfolioContainer.nativeElement);

        observerBrandLogo.observe(this.brandsContainer.nativeElement);
        observerBrandHeadline.observe(this.brandsContainer.nativeElement);
        observerBrandText.observe(this.brandsContainer.nativeElement);
        observerBrandButton.observe(this.brandsContainer.nativeElement);
        observerBrandRow1.observe(this.brandsGridContainer.nativeElement);
        observerBrandRow2.observe(this.brandsGridContainer.nativeElement);

        observerStoreLogo.observe(this.storeContainer.nativeElement);
        observerStoreHeadline.observe(this.storeContainer.nativeElement);
        observerStoreText.observe(this.storeContainer.nativeElement);
        observerStoreButton.observe(this.storeContainer.nativeElement);

        observerGuideLogo.observe(this.guideContainer.nativeElement);
        observerGuideHeadline.observe(this.guideContainer.nativeElement);
        observerGuideText.observe(this.guideContainer.nativeElement);
        observerGuideButton.observe(this.guideContainer.nativeElement);
        observerGuideImage.observe(this.guideImageContainer.nativeElement);

        observerContactLogo.observe(this.contactContainer.nativeElement);
        observerContactHeadline.observe(this.contactContainer.nativeElement);
        observerProjectContainer.observe(this.contactContainer.nativeElement);
        observerProjectHeadline.observe(this.projectContainer.nativeElement);
        observerProjectText.observe(this.projectContainer.nativeElement);
        observerForm.observe(this.contactContainer.nativeElement);

        observerFooter.observe(this.footerContainer.nativeElement);
      } else {
        console.warn(
          'IntersectionObserver is not supported in this environment.'
        );
      }
    }
  }

  sectionString: any;
  sectionViewChild() {
    let targetElement: ElementRef | undefined;

    switch (this.sectionString) {
      case 'work':
        targetElement = this.selectedWorkContainer;
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

    if (targetElement) {
      this.smoothScroll(targetElement!.nativeElement);
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

  ngOnInit() {
    this.sharedService.section$.subscribe((sec) => {
      this.sectionString = sec;
      if (this.sectionString) this.sectionViewChild();
    });
  }

  emitImageSrc(src: any) {
    this.sharedService.updateImage(src);
  }
}
