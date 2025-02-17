import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  ChangeDetectorRef,
} from '@angular/core';
import { SharedService } from '../services/shared.service';
import { CartService } from '../services/cart.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-logo-store',
  imports: [CommonModule, NavbarComponent, HttpClientModule],
  templateUrl: './logo-store.component.html',
  styleUrl: './logo-store.component.css',
  standalone: true,
})
export class LogoStoreComponent implements OnInit {
  currentPage: number = 1;
  private logosPerPage: number = 30;
  public displayedLogos: any[] = [];
  public totalPages: number = 1;
  private routerSubscription!: Subscription;
  private logosSubscription!: Subscription;

  allLogos: any[] = [];

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cd: ChangeDetectorRef
  ) {}

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

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  public goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.displayLogosForCurrentPage();
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  openLogo(logo: any): void {
    this.sharedService.setLogoDetail(logo);
    this.router.navigate(['/logo-store/logo-details']);
  }

  cartSize: number = 0;

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  customLogoRequest(): void {
    this.router.navigate(['/custom-logo']);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    this.cartService.cartLength$.subscribe((length) => {
      this.cartSize = length;
    });

    this.loadLogos();

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadLogos();
      });

    this.logosSubscription = this.sharedService.allLogos$.subscribe((logos) => {
      if (logos.length > 0) {
        this.allLogos = logos;
        this.updatePagination();
        this.displayLogosForCurrentPage();
        this.cd.detectChanges();
      }
    });
  }

  loadLogos(): void {
    this.sharedService.getAllLogos().subscribe(
      (logos) => {
        this.allLogos = logos;
        this.updatePagination();
        this.displayLogosForCurrentPage();
        this.cd.detectChanges();
      },
      (error) => {
        console.error('Error loading logos:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.logosSubscription) {
      this.logosSubscription.unsubscribe();
    }
  }
}
