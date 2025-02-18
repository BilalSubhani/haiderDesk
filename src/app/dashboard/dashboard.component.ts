import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
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
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
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
  activeSection: string = 'logos';
  logos: any[] = [];
  emails: any[] = [];
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

  constructor(
    private sharedService: SharedService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.logoForm = this.fb.group({
      name: ['', Validators.required],
      originalPrice: [''],
      salePrice: ['', Validators.required],
      description: [''],
      imageSrc: ['', Validators.required],
    });

    this.adminForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadLogos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  ngOnInit() {
    this.loadLogos();
    this.loadEmails();
    this.loadAdmins();
  }

  loadLogos() {
    this.sharedService.getAllLogos().subscribe((logos) => {
      const allLogos = logos;
      this.totalPages = Math.ceil(allLogos.length / this.itemsPerPage);
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.logos = allLogos.slice(startIndex, startIndex + this.itemsPerPage);
    });
  }

  loadEmails() {
    this.sharedService.getAllEmails().subscribe((emails) => {
      this.emails = emails;
    });
  }

  loadAdmins() {
    this.adminService.getAllAdmins().subscribe((admins) => {
      this.admins = admins;
    });
  }

  onSubmitLogo() {
    if (this.logoForm.valid) {
      this.sharedService
        .addLogo({
          ...this.logoForm.value,
        })
        .subscribe(() => {
          this.loadLogos();
          this.toggleAddLogoForm();
        });
    }
  }

  onSubmitAdmin() {
    if (this.adminForm.valid) {
      this.adminService.createAdmin(this.adminForm.value).subscribe(() => {
        this.loadAdmins();
        this.toggleAddAdminForm();
      });
    }
  }

  deleteLogo(id: any) {
    console.log(id);
    this.sharedService.deleteLogo(id).subscribe(() => {
      this.loadLogos();
    });
  }

  addEmail() {
    if (this.newEmail && this.newEmail.trim()) {
      this.sharedService.addEmail(this.newEmail.trim()).subscribe(() => {
        this.newEmail = '';
        this.loadEmails();
      });
    }
  }

  deleteEmail(id: any) {
    this.sharedService.deleteEmail(id).subscribe(() => {
      this.loadEmails();
    });
  }

  deleteAdmin(id: any) {
    this.adminService.deleteAdmin(id).subscribe(() => {
      this.loadAdmins();
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
}
