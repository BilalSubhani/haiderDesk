import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../cart.service';

import { ToastrService } from 'ngx-toastr';

interface LogoDetail {
  id: number;
  name: string;
  originalPrice?: number;
  salePrice: number;
  image: string;
  description: string;
}

@Component({
  selector: 'app-logo-detail',
  templateUrl: './logo-detail.component.html',
  styleUrls: ['./logo-detail.component.css'],
  imports: [CommonModule],
  providers: [ToastrService],
  standalone: true,
})
export class LogoDetailComponent {
  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  private subscription: Subscription = new Subscription();

  logoDetail!: LogoDetail;

  ngOnInit() {
    this.subscription = this.sharedService.logoDetail$.subscribe((logo) => {
      this.logoDetail = logo;

      const logoName = this.route.snapshot.paramMap.get('logoName');
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addToCart(logo: LogoDetail) {
    this.cartService.addToCart(logo);
    this.toastr.success(`${logo.name} added to cart!`, 'Successful!');
  }

  navigateToStore(): void {
    this.router.navigate(['/logo-store']);
  }
}
