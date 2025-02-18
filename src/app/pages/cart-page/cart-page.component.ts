import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../main/navbar/navbar.component';
import { EmailService } from '../../services/email.service';
import { ToastrService } from 'ngx-toastr';

interface CartItem {
  name: string;
  originalPrice?: number;
  salePrice: number;
  description?: string;
  imageSrc: string;
}

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
})
export class CartPageComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  checkoutForm!: FormGroup;
  paymentMethods = ['PayPal', 'Stripe', 'Other'];
  buttonDetails: string = 'Add First Logo';

  constructor(
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private emailService: EmailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cartService.cartLength$.subscribe((length) => {
      this.buttonDetails = length === 0 ? 'Add First Logo' : 'Add More Logos';
    });

    this.checkoutForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        paymentMethod: ['', [Validators.required]],
        cardNumber: [''],
        cardExpiry: [''],
        cardCVC: [''],
      },
      { updateOn: 'change' }
    );

    this.loadCart();

    this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe((method) => {
      this.updateCardValidators(method);
    });

    this.checkoutForm.statusChanges.subscribe((status) => {
      this.cdRef.detectChanges();
    });

    Object.keys(this.checkoutForm.controls).forEach((key) => {
      this.checkoutForm.get(key)?.valueChanges.subscribe((value) => {});
    });
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + item.salePrice, 0);
  }

  removeItem(logoId: any): void {
    this.cartService.removeFromCart(logoId);
    this.loadCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }

  navigateToStore(): void {
    this.router.navigate(['/logo-store']);
  }

  showCardDetails(): boolean {
    return false;
  }

  updateCardValidators(method: string): void {
    if (method === 'Other') {
      this.checkoutForm
        .get('cardNumber')
        ?.setValidators([
          Validators.required,
          Validators.pattern('^[0-9]{16}$'),
        ]);
      this.checkoutForm
        .get('cardExpiry')
        ?.setValidators([
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])/(\\d{2})$'),
        ]);
      this.checkoutForm
        .get('cardCVC')
        ?.setValidators([
          Validators.required,
          Validators.pattern('^[0-9]{3,4}$'),
        ]);
    } else {
      this.checkoutForm.get('cardNumber')?.setValidators(null);
      this.checkoutForm.get('cardExpiry')?.setValidators(null);
      this.checkoutForm.get('cardCVC')?.setValidators(null);
    }

    ['cardNumber', 'cardExpiry', 'cardCVC'].forEach((controlName) => {
      const control = this.checkoutForm.get(controlName);
      control?.updateValueAndValidity({ emitEvent: true });
    });

    this.checkoutForm.updateValueAndValidity({ emitEvent: true });
  }

  isFormValid(): boolean {
    return this.checkoutForm.valid;
  }

  getFieldError(fieldName: string): string {
    const control = this.checkoutForm.get(fieldName);
    if (control?.touched && control?.invalid) {
      if (control.errors?.['required']) {
        return `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required`;
      }
      if (control.errors?.['email']) {
        return 'Invalid email format';
      }
      if (control.errors?.['pattern']) {
        switch (fieldName) {
          case 'phone':
            return 'Phone number must be 10 digits';
          case 'cardNumber':
            return 'Card number must be 16 digits';
          case 'cardExpiry':
            return 'Expiry date must be in MM/YY format';
          case 'cardCVC':
            return 'CVC must be 3 or 4 digits';
          default:
            return 'Invalid format';
        }
      }
    }
    return '';
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const emailData = {
        userdata: this.checkoutForm.value,
        cartData: this.cartItems,
      };

      const emailBody = this.generateEmailBody(emailData);

      const cartData = {
        subject: 'New Order Received',
        body: emailBody,
      };

      this.emailService.sendEmails(cartData).subscribe(
        (response) => {
          this.toastr.success(`Order Placed successfully!`, 'Successful!');
          this.clearCart();
        },
        (error) => {
          this.toastr.error(``, 'Error checking out!');
        }
      );
    } else {
      Object.keys(this.checkoutForm.controls).forEach((key) => {
        const control = this.checkoutForm.get(key);
        control?.markAsTouched();
      });
      console.log('Form is invalid', this.checkoutForm.errors);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.checkoutForm.get(fieldName);
    return control ? control.invalid && control.touched : false;
  }

  generateEmailBody(formData: any): string {
    const { userdata, cartData }: { userdata: any; cartData: CartItem[] } =
      formData;

    return `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            text-align: center;
          }
          .email-container {
            max-width: 600px;
            margin: auto;
            background: #ffffef;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: left;
          }
          h2 {
            color: #005840;
            text-align: center;
            border-bottom: 2px solid #005840;
            padding-bottom: 10px;
          }
          p {
            font-size: 16px;
            color: #005840;
            font-weight: bold;
          }
          ul {
            list-style-type: none;
            padding: 0;
            color: #555;
          }
          ul li {
            padding: 5px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: center;
          }
          thead {
            background-color: #005840;
            color: #ffffef;
          }
          tbody tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          img {
            max-width: 80px;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h2>New Order Received</h2>

          <p>User Information</p>
          <ul>
            <li><strong>Name:</strong> ${userdata.name}</li>
            <li><strong>Email:</strong> ${userdata.email}</li>
            <li><strong>Phone:</strong> ${userdata.phone}</li>
            <li><strong>Payment Method:</strong> ${userdata.paymentMethod}</li>
          </ul>

          <p>Cart Details</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Original Price</th>
                <th>Sale Price</th>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              ${cartData
                .map(
                  (item: CartItem) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${
                    item.originalPrice ? `$${item.originalPrice}` : 'N/A'
                  }</td>
                  <td>$${item.salePrice}</td>
                  <td>${item.description || 'No description available'}</td>
                  <td><img src="${item.imageSrc}" alt="${item.name}"></td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </body>
    </html>
    `;
  }
}
