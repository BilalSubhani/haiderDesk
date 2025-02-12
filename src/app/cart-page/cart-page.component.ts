import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartService, LogoDetail } from '../cart.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
  imports: [CommonModule, ReactiveFormsModule],
})
export class CartPageComponent implements OnInit {
  cartItems: LogoDetail[] = [];
  total: number = 0;
  checkoutForm!: FormGroup;
  paymentMethods = ['PayPal', 'Stripe', 'Other'];
  buttonDetails: string = 'Add Your First Logo';

  constructor(
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cartService.cartLength$.subscribe((length) => {
      this.buttonDetails =
        length === 0 ? 'Add Your First Logo' : 'Add More Logos';
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
      console.log('Form Status:', status);
      console.log('Form Errors:', this.checkoutForm.errors);
      console.log('Form Valid:', this.checkoutForm.valid);
      console.log('Form Values:', this.checkoutForm.value);
      this.cdRef.detectChanges();
    });

    Object.keys(this.checkoutForm.controls).forEach((key) => {
      this.checkoutForm.get(key)?.valueChanges.subscribe((value) => {
        console.log(`${key} value changed:`, value);
        console.log(`${key} validity:`, this.checkoutForm.get(key)?.valid);
        console.log(`${key} errors:`, this.checkoutForm.get(key)?.errors);
      });
    });
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + item.salePrice, 0);
  }

  removeItem(logoId: number): void {
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
    return this.checkoutForm.get('paymentMethod')?.value === 'Other';
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
    console.log('Form Valid State:', {
      formValid: this.checkoutForm.valid,
      formTouched: this.checkoutForm.touched,
      formDirty: this.checkoutForm.dirty,
      formErrors: this.checkoutForm.errors,
      controls: Object.keys(this.checkoutForm.controls).map((key) => ({
        key,
        valid: this.checkoutForm.get(key)?.valid,
        errors: this.checkoutForm.get(key)?.errors,
      })),
    });
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
      console.log('Form submitted:', this.checkoutForm.value);
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
}
