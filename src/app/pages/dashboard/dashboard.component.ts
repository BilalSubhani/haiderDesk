import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { OrdersService } from '../../services/orders.service';
import { VisualizationComponent } from './visualization/visualization.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    VisualizationComponent,
  ],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          height: '0',
          opacity: 0,
        })
      ),
      transition('in <=> out', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  activeSection: string = '';
  logos: any[] = [];
  emails: any[] = [];
  categories: any[] = [];
  newEmail: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 30;
  totalPages: number = 1;

  logoForm: FormGroup;
  showAddLogoForm = false;
  isDragging = false;
  selectedFile: File | null = null;

  admins: any[] = [];
  showAddAdminForm = false;
  adminForm: FormGroup;

  categoryForm: FormGroup;
  showCategoryForm = false;

  orders: any[] = [];
  currentDate: string = '';

  constructor(
    private sharedService: SharedService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private ordersService: OrdersService,
    private toastr: ToastrService
  ) {
    this.logoForm = this.fb.group({
      name: ['', Validators.required],
      originalPrice: [''],
      salePrice: ['', Validators.required],
      description: [''],
      imageSrc: ['', Validators.required],
      category: ['', Validators.required],
    });

    this.adminForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
    });
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
    if (this.activeSection == 'logos') {
      this.loadLogos();
    } else if (this.activeSection === 'emails') {
      this.loadEmails();
    } else if (this.activeSection === 'categories') {
      this.loadCategories();
    } else if (this.activeSection === 'admins') {
      this.loadAdmins();
    } else if (this.activeSection === 'orders') {
      this.loadOrders();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setActiveSection(section: string) {
    this.currentPage = 1;
    if (section == 'logos') {
      this.loadLogos();
    } else if (section === 'emails') {
      this.loadEmails();
    } else if (section === 'categories') {
      this.loadCategories();
    } else if (section === 'admins') {
      this.loadAdmins();
    } else if (section === 'orders') {
      this.loadOrders();
    }
    this.activeSection = section;
  }

  ngOnInit() {
    this.loadLogos();
    this.loadEmails();
    this.loadAdmins();
    this.loadOrders();
    this.loadCategories();
    this.getAdminDetails();

    this.currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  loadLogos() {
    this.sharedService.getAllLogos().subscribe((logos) => {
      const allLogos = logos;
      this.totalPages = Math.ceil(allLogos.length / this.itemsPerPage);
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.logos = allLogos.slice(startIndex, startIndex + this.itemsPerPage);
    });
  }

  loadCategories() {
    this.sharedService.getAllCategories().subscribe((category) => {
      const allCategories = category;
      this.totalPages = Math.ceil(allCategories.length / this.itemsPerPage);
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.categories = allCategories.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    });
  }

  loadEmails() {
    this.sharedService.getAllEmails().subscribe((emails) => {
      const allemails = emails;
      this.totalPages = Math.ceil(allemails.length / this.itemsPerPage);
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.emails = allemails.slice(startIndex, startIndex + this.itemsPerPage);
    });
  }

  loadAdmins() {
    this.adminService.getAllAdmins().subscribe((admins) => {
      const alladmins = admins;
      this.totalPages = Math.ceil(alladmins.length / this.itemsPerPage);
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.admins = alladmins.slice(startIndex, startIndex + this.itemsPerPage);
    });
  }

  loadOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      const allOrders = orders;
      this.totalPages = Math.ceil(allOrders.length / this.itemsPerPage);
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.orders = allOrders.slice(startIndex, startIndex + this.itemsPerPage);
    });
  }

  onSubmitLogo() {
    if (this.logoForm.valid) {
      this.sharedService
        .addLogo({
          ...this.logoForm.value,
        })
        .subscribe(
          () => {
            this.toastr.success(`Product added successfully!`, 'Successful!');
            this.loadLogos();
            this.toggleAddLogoForm();
          },
          (error) => {
            this.toastr.error(``, 'Error!');
          }
        );
    }
  }

  onSubmitCategory() {
    if (this.categoryForm.valid) {
      this.sharedService
        .addCategory({
          ...this.categoryForm.value,
        })
        .subscribe(
          (response) => {
            this.toastr.success(`Category added successfully!`, 'Successful!');
            this.loadCategories();
            this.toggleAddCategoryForm();
          },
          (error) => {
            this.toastr.error(``, 'Error!');
          }
        );
    }
  }

  onSubmitAdmin() {
    if (this.adminForm.valid) {
      this.adminService.createAdmin(this.adminForm.value).subscribe(
        (response) => {
          this.toastr.success(`Admin added successfully!`, 'Successful!');
          this.loadAdmins();
          this.toggleAddAdminForm();
        },
        (error) => {
          this.toastr.error(``, 'Error!');
        }
      );
    }
  }

  deleteLogo(id: any) {
    this.confirmDelete().then((confirmed) => {
      if (confirmed) {
        this.sharedService.deleteLogo(id).subscribe(
          (response) => {
            this.toastr.success(`Logo deleted successfully!`, 'Successful!');
            this.loadLogos();
          },
          (error) => {
            this.toastr.error(``, 'Error!');
          }
        );
      } else {
        this.toastr.info(`Data is unchanged.`, 'Cancelled!');
      }
    });
  }

  deleteCategory(id: any) {
    this.confirmDelete().then((confirmed) => {
      if (confirmed) {
        this.sharedService.deleteCategory(id).subscribe(
          (response) => {
            this.toastr.success(
              `Category deleted successfully!`,
              'Successful!'
            );
            this.loadCategories();
          },
          (error) => {
            this.toastr.error(
              `Category has products attached to it.`,
              'Error!'
            );
          }
        );
      } else {
        this.toastr.info(`Data is unchanged.`, 'Cancelled!');
      }
    });
  }

  addEmail() {
    if (this.newEmail && this.newEmail.trim()) {
      this.sharedService.addEmail(this.newEmail.trim()).subscribe(
        (response) => {
          this.toastr.success(`Email added successfully!`, 'Successful!');
          this.newEmail = '';
          this.loadEmails();
        },
        (error) => {
          this.toastr.error(``, 'Error!');
        }
      );
    }
  }

  deleteEmail(id: any) {
    this.confirmDelete().then((confirmed) => {
      if (confirmed) {
        this.sharedService.deleteEmail(id).subscribe(
          (response) => {
            this.toastr.success(`Email deleted successfully!`, 'Successful!');
            this.loadEmails();
          },
          (error) => {
            this.toastr.error(``, 'Error!');
          }
        );
      } else {
        this.toastr.info(`Data is unchanged.`, 'Cancelled!');
      }
    });
  }

  deleteAdmin(id: any) {
    this.confirmDelete().then((confirmed) => {
      if (confirmed) {
        this.adminService.deleteAdmin(id).subscribe(
          (response) => {
            this.toastr.success(`Admin deleted successfully!`, 'Successful!');
            this.loadAdmins();
          },
          (error) => {
            this.toastr.error(``, 'Error!');
          }
        );
      } else {
        this.toastr.info(`Data is unchanged.`, 'Cancelled!');
      }
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  logout() {
    this.loginService.logout();
  }

  toggleAddLogoForm(): void {
    this.showAddLogoForm = !this.showAddLogoForm;
    if (!this.showAddLogoForm) {
      this.logoForm.reset();
      this.selectedFile = null;
    }
  }

  toggleAddCategoryForm(): void {
    this.showCategoryForm = !this.showCategoryForm;
    if (!this.showCategoryForm) {
      this.categoryForm.reset();
    }
  }

  toggleAddAdminForm(): void {
    this.showAddAdminForm = !this.showAddAdminForm;
    if (!this.showAddAdminForm) {
      this.adminForm.reset();
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        this.selectedFile = file;
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  orderStatusOptions: string[] = ['Processing', 'Completed', 'Cancelled'];

  changeOrderStatus(order: any, event: Event) {
    const selectedStatus = (event.target as HTMLSelectElement).value;
    this.onSaveOrderStatus(order._id, selectedStatus);
  }

  onSaveOrderStatus(id: string, orderStatus: string) {
    const status = {
      status: orderStatus,
    };

    this.ordersService.updateOrderStatus(id, status).subscribe(
      (response) => {
        this.toastr.success(`Status updated successfully!`, 'Successful!');
        this.loadOrders();
      },
      (error) => {
        this.toastr.error(`Try again later.`, 'Error!');
      }
    );
  }

  deleteOrder(id: any) {
    this.confirmDelete().then((confirmed) => {
      if (confirmed) {
        this.ordersService.deleteOrder(id).subscribe(
          (response) => {
            this.toastr.success(`Order deleted successfully!`, 'Successful!');
            this.loadOrders();
          },
          (error) => {
            this.toastr.error(``, 'Error!');
          }
        );
      } else {
        this.toastr.info(`Data is unchanged.`, 'Cancelled!');
      }
    });
  }

  isProfileOpen = false;
  user: any;

  getAdminDetails() {
    this.user = this.loginService.getUserDetails();
  }

  openProfile() {
    this.getAdminDetails();
    this.isProfileOpen = true;
  }

  closeProfile() {
    this.isProfileOpen = false;
  }

  showModal: boolean = false;
  resolveFn: ((result: boolean) => void) | null = null;

  confirmDelete(): Promise<boolean> {
    this.showModal = true;

    return new Promise<boolean>((resolve) => {
      this.resolveFn = resolve;
    });
  }

  onConfirm(result: boolean): void {
    this.showModal = false;
    if (this.resolveFn) {
      this.resolveFn(result);
      this.resolveFn = null;
    }
  }
}
