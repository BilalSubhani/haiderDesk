import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-logo',
  imports: [],
  templateUrl: './custom-logo.component.html',
  styleUrl: './custom-logo.component.css',
})
export class CustomLogoComponent {
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

      console.log('Form Data:', this.formData);

      form.reset();
    }
  }
}
