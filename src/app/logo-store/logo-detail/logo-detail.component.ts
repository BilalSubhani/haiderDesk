import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
})
export class LogoDetailComponent {
  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute
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
}
