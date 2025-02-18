import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from '../../services/email.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-me',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.css',
})
export class ContactMeComponent {
  contactForm: FormGroup;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private fb: FormBuilder,
    private emailService: EmailService,
    private toastr: ToastrService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      budget: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }
  @ViewChild('contactContainer', { static: false })
  contactContainer!: ElementRef;
  @ViewChild('contactLogo', { static: false }) contactLogo!: ElementRef;
  @ViewChild('contactHeadline', { static: false }) contactHeadline!: ElementRef;
  @ViewChild('projectContainer', { static: false })
  projectContainer!: ElementRef;
  @ViewChild('projectHeadline', { static: false }) projectHeadline!: ElementRef;
  @ViewChild('projectText', { static: false }) projectText!: ElementRef;
  @ViewChild('formContainer', { static: false }) formContainer!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        // Contact Me
        const observerContactLogo = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(this.contactLogo.nativeElement, 'show');
                obs.disconnect();
              }
            });
          },
          { threshold: 0.1 }
        );

        const observerContactHeadline = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(
                  this.contactHeadline.nativeElement,
                  'show'
                );
                obs.disconnect();
              }
            });
          },
          { threshold: 0.2 }
        );

        const observerProjectContainer = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(
                  this.projectContainer.nativeElement,
                  'show'
                );
                obs.disconnect();
              }
            });
          },
          { threshold: 0.3 }
        );

        const observerProjectHeadline = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(
                  this.projectHeadline.nativeElement,
                  'show'
                );
                obs.disconnect();
              }
            });
          },
          { threshold: 0.1 }
        );

        const observerProjectText = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(this.projectText.nativeElement, 'show');
                obs.disconnect();
              }
            });
          },
          { threshold: 0.3 }
        );

        const observerForm = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.renderer.addClass(
                  this.formContainer.nativeElement,
                  'show'
                );
                obs.disconnect();
              }
            });
          },
          { threshold: 0.3 }
        );

        observerContactLogo.observe(this.contactContainer.nativeElement);
        observerContactHeadline.observe(this.contactContainer.nativeElement);
        observerProjectContainer.observe(this.contactContainer.nativeElement);
        observerProjectHeadline.observe(this.projectContainer.nativeElement);
        observerProjectText.observe(this.projectContainer.nativeElement);
        observerForm.observe(this.contactContainer.nativeElement);
      } else {
        console.warn(
          'IntersectionObserver is not supported in this environment.'
        );
      }
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contactData = this.convertFormDataToHtml(this.contactForm.value);
      const emailData = {
        subject: 'New Project Request',
        body: contactData,
      };
      this.emailService.sendEmails(emailData).subscribe(() => {
        this.toastr.success('You will be contacted soon.', 'Success!');
        this.contactForm.reset();
      });
    }
  }

  convertFormDataToHtml(formData: any): string {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background-color: #f4f4f4;
            }
            h2 {
              color: #005840;
              text-align: center;
              border-bottom: 2px solid #333;
              padding-bottom: 10px;
            }
            p {
              font-size: 16px;
              color: #333;
              line-height: 1.6;
            }
            strong {
              color: #333;
            }
            .container {
              background-color: #ffffef;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              max-width: 600px;
              margin: 0 auto;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Project Request</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Budget:</strong> ${formData.budget}</p>
            <p><strong>Message:</strong> ${formData.message}</p>
          </div>
        </body>
      </html>
    `;
  }
}
