import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { OrdersService } from '../../../services/orders.service';
import { AdminService } from '../../../services/admin.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Subscription, forkJoin, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../../services/analytics.service';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
  imports: [NgxChartsModule, CommonModule],
  standalone: true,
})
export class VisualizationComponent implements OnInit, OnDestroy {
  totalLogos = 0;
  totalOrders = 0;
  totalAdmins = 0;
  totalEmails = 0;

  processingOrders = 0;
  completedOrders = 0;
  cancelledOrders = 0;

  paypal = 0;
  stripe = 0;
  others = 0;

  visitCount: number = 0;
  currentDate: string = '';

  orderStatusData: any[] = [];
  paymentMethodData: any[] = [];
  view: [number, number] = [700, 400];

  private dataSubscription?: Subscription;

  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#005840', '#00c853', '#FF6B6B'],
  };

  paymentColorScheme = {
    name: 'customPayment',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#003087', '#00A8E1', '#FFB74D'],
  };

  loading = true;
  error: string | null = null;

  constructor(
    private sharedService: SharedService,
    private ordersService: OrdersService,
    private adminService: AdminService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();

    this.currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    this.dataSubscription = timer(0, 30000)
      .pipe(switchMap(() => this.fetchAllData()))
      .subscribe({
        next: (data) => this.processData(data),
        error: (err) => {
          this.loading = false;
          this.error = 'Failed to load dashboard data';
          console.error('Dashboard data error:', err);
        },
      });

    this.analyticsService.getVisitCount().subscribe((data) => {
      this.visitCount = data.visits;
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

  private fetchAllData() {
    return forkJoin({
      logos: this.sharedService.getAllLogos(),
      orders: this.ordersService.getOrders(),
      admins: this.adminService.getAllAdmins(),
      emails: this.sharedService.getAllEmails(),
    });
  }

  private loadDashboardData(): void {
    this.loading = true;
    this.fetchAllData().subscribe({
      next: (data) => {
        this.processData(data);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Failed to load dashboard data';
        console.error('Error loading dashboard data:', error);
      },
    });
  }

  private processData(data: any): void {
    this.totalLogos = data.logos?.length ?? 0;
    this.totalOrders = data.orders?.length ?? 0;
    this.totalAdmins = data.admins?.length ?? 0;
    this.totalEmails = data.emails?.length ?? 0;

    this.processingOrders =
      data.orders?.filter(
        (order: { status?: string }) =>
          order.status?.toLowerCase() === 'processing'
      ).length ?? 0;

    this.completedOrders =
      data.orders?.filter(
        (order: { status?: string }) =>
          order.status?.toLowerCase() === 'completed'
      ).length ?? 0;

    this.cancelledOrders =
      data.orders?.filter(
        (order: { status?: string }) =>
          order.status?.toLowerCase() === 'cancelled'
      ).length ?? 0;

    this.orderStatusData = [
      { name: 'Processing', value: this.processingOrders },
      { name: 'Completed', value: this.completedOrders },
      { name: 'Cancelled', value: this.cancelledOrders },
    ];

    this.paypal =
      data.orders?.filter(
        (order: { paymentMethod?: string }) =>
          order.paymentMethod?.toLowerCase() === 'paypal'
      ).length ?? 0;

    this.stripe =
      data.orders?.filter(
        (order: { paymentMethod?: string }) =>
          order.paymentMethod?.toLowerCase() === 'stripe'
      ).length ?? 0;

    this.others =
      data.orders?.filter(
        (order: { paymentMethod?: string }) =>
          order.paymentMethod?.toLowerCase() === 'others'
      ).length ?? 0;

    this.paymentMethodData = [
      { name: 'Paypal', value: this.paypal },
      { name: 'Stripe', value: this.stripe },
      { name: 'Others', value: this.others },
    ];
  }
}
