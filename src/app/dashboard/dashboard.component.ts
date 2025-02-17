import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
})
export class DashboardComponent implements OnInit {
  activeSection: string = 'logos';
  logos: any[] = [];
  emails: any[] = [];
  showAddLogoForm: boolean = false;
  logoForm: FormGroup;
  newEmail: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 30;
  totalPages: number = 1;

  constructor(
    private sharedService: SharedService,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {
    this.logoForm = this.fb.group({
      name: ['', Validators.required],
      originalPrice: [''],
      salePrice: ['', Validators.required],
      description: [''],
      imageSrc: ['', Validators.required],
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

  toggleAddLogoForm() {
    this.showAddLogoForm = !this.showAddLogoForm;
    if (!this.showAddLogoForm) {
      this.logoForm.reset();
    }
  }

  ngOnInit() {
    this.loadLogos();
    this.loadEmails();
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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  logout() {
    this.loginService.logout();
  }
}
