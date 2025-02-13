import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  ChangeDetectorRef,
} from '@angular/core';
import { SharedService } from '../shared.service';
import { CartService } from '../cart.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';

interface Logo {
  id: number;
  name: string;
  originalPrice?: number;
  salePrice: number;
  image: string;
  description: string;
}

@Component({
  selector: 'app-logo-store',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './logo-store.component.html',
  styleUrl: './logo-store.component.css',
  standalone: true,
})
export class LogoStoreComponent implements OnInit {
  currentPage: number = 1;
  private logosPerPage: number = 30;
  public displayedLogos: Logo[] = [];
  public totalPages: number = 1;
  private routerSubscription!: Subscription;

  allLogos: Logo[] = [];

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cd: ChangeDetectorRef
  ) {
    this.updatePagination();
    this.displayLogosForCurrentPage();
  }

  private updatePagination(): void {
    this.totalPages = Math.ceil(this.allLogos.length / this.logosPerPage);
    if (this.totalPages === 0) this.totalPages = 1;
  }

  public getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  private displayLogosForCurrentPage(): void {
    const startIndex = (this.currentPage - 1) * this.logosPerPage;
    const endIndex = Math.min(
      startIndex + this.logosPerPage,
      this.allLogos.length
    );
    this.displayedLogos = this.allLogos.slice(startIndex, endIndex);
  }

  public changePage(direction: 'prev' | 'next'): void {
    if (direction === 'prev' && this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    } else if (direction === 'next' && this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.displayLogosForCurrentPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  public addNewLogo(logo: Logo): void {
    this.allLogos.push(logo);
    this.updatePagination();
    this.displayLogosForCurrentPage();
  }

  public addExampleLogo(): void {
    const newLogo: Logo = {
      id: this.allLogos.length + 1,
      name: `New Logo ${this.allLogos.length + 1}`,
      originalPrice: 800.0,
      salePrice: 600.0,
      image: 'assets/new-logo.svg',
      description: '',
    };
    this.addNewLogo(newLogo);
  }

  replaceSpaces(str: string) {
    return str.replace(/ /g, '_');
  }

  openLogo(logo: Logo) {
    this.sharedService.setLogoDetail(logo);
    this.router.navigate(['/logo-store/', this.replaceSpaces(logo.name)]);
  }

  cartSize: number = 0;

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  customLogoRequest() {
    this.router.navigate(['/custom-logo']);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.cartService.cartLength$.subscribe((length) => {
      this.cartSize = length;
    });

    this.loadLogos();

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.loadLogos());

    this.updatePagination();
    this.displayLogosForCurrentPage();
  }

  loadLogos() {
    this.sharedService.allLogos$.subscribe((logoArr) => {
      this.allLogos = [...logoArr];
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  trackById(index: number, logo: Logo): number {
    return logo.id;
  }
}
