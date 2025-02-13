import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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

  constructor(private sharedService: SharedService, private fb: FormBuilder) {
    this.logoForm = this.fb.group({
      name: ['', Validators.required],
      originalPrice: [''],
      salePrice: ['', Validators.required],
      description: [''],
      image: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadLogos();
    this.loadEmails();
  }

  loadLogos() {
    const allLogos = this.sharedService.getAllLogos();
    this.totalPages = Math.ceil(allLogos.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.logos = allLogos.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadLogos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadEmails() {
    this.emails = this.sharedService.getAllEmails();
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

  onSubmitLogo() {
    if (this.logoForm.valid) {
      this.sharedService.addLogo({
        id: 0,
        ...this.logoForm.value,
      });
      this.loadLogos();
      this.toggleAddLogoForm();
    }
  }

  deleteLogo(id: number) {
    this.sharedService.deleteLogo(id);
    this.loadLogos();
  }

  addEmail() {
    if (this.newEmail && this.newEmail.trim()) {
      this.sharedService.addEmail(this.newEmail.trim());
      this.newEmail = '';
      this.loadEmails();
    }
  }

  deleteEmail(id: number) {
    this.sharedService.deleteEmail(id);
    this.loadEmails();
  }
}
