import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { SharedService } from '../shared.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private sharedService: SharedService
  ) {}
  @ViewChild('navbar', { static: true }) navbar!: ElementRef;
  private observer!: IntersectionObserver;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        window.addEventListener('scroll', this.onScroll.bind(this));
      }, 500);
    }
  }

  onScroll() {
    const scrollOffset = window.scrollY;
    const threshold = 100;

    if (this.navbar) {
      if (scrollOffset < threshold) {
        this.navbar.nativeElement.classList.add('expand');
      } else {
        this.navbar.nativeElement.classList.remove('expand');
      }
    }
  }

  scrollToSection(comp: string) {
    this.sharedService.updateSection(comp);
    // if (comp === 'work') this.scrollToPosition(2800);
    // else if (comp === 'testimonial') this.scrollToPosition(4600);
    // else if (comp === 'about') this.scrollToPosition(5350);
    // else if (comp === 'contact') this.scrollToPosition(9750);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToPosition(px: number) {
    window.scrollTo({ top: px, behavior: 'smooth' });
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
