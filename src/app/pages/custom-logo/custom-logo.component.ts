import { Component } from '@angular/core';
import { NavbarComponent } from '../main/navbar/navbar.component';
import { EmailService } from '../../services/email.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-custom-logo',
  imports: [NavbarComponent],
  templateUrl: './custom-logo.component.html',
  styleUrl: './custom-logo.component.css',
})
export class CustomLogoComponent {
  constructor(
    private emailService: EmailService,
    private toastr: ToastrService
  ) {}

  formData = {
    name: '',
    email: '',
    logoName: '',
    logoIdea: '',
  };

  onSubmit() {
    const form = document.querySelector('form') as HTMLFormElement;
    if (form) {
      this.formData.name = (
        form.querySelector('input[placeholder="Name"]') as HTMLInputElement
      ).value;
      this.formData.email = (
        form.querySelector(
          'input[placeholder="Email address"]'
        ) as HTMLInputElement
      ).value;
      this.formData.logoName = (
        form.querySelector(
          'input[placeholder="Logo Name (Optional)"]'
        ) as HTMLInputElement
      ).value;
      this.formData.logoIdea = (
        form.querySelector('textarea') as HTMLTextAreaElement
      ).value;
      this.sendEmail();

      form.reset();
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
            <h2>Custom Logo Request</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Logo Name:</strong> ${formData.logoName}</p>
            <p><strong>Logo Description:</strong> ${formData.logoIdea}</p>
          </div>
        </body>
      </html>
    `;
  }

  sendEmail() {
    const emailBody = this.convertFormDataToHtml(this.formData);
    const emailData = {
      subject: 'Custom Logo Request',
      body: emailBody,
    };
    this.emailService.sendEmails(emailData).subscribe(
      (response) => {
        this.toastr.success(
          'Custom logo request sent successfully.',
          'Successful!'
        );
      },
      (error) => {
        this.toastr.error('Error sending email.', 'Error!');
      }
    );
  }
}
