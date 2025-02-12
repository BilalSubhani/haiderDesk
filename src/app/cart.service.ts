import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface LogoDetail {
  id: number;
  name: string;
  originalPrice?: number;
  salePrice: number;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart_items';
  private cartLengthSubject = new BehaviorSubject<number>(0);
  cartLength$ = this.cartLengthSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.updateCartLength();
  }

  private updateCartLength(): void {
    this.cartLengthSubject.next(this.getCart().length);
  }

  getCart(): LogoDetail[] {
    if (isPlatformBrowser(this.platformId)) {
      const cart = localStorage.getItem(this.cartKey);
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }

  addToCart(logo: LogoDetail): void {
    if (isPlatformBrowser(this.platformId)) {
      const cart = this.getCart();
      if (!cart.find((item) => item.id === logo.id)) {
        cart.push(logo);
        localStorage.setItem(this.cartKey, JSON.stringify(cart));
        this.updateCartLength();
      }
    }
  }

  removeFromCart(logoId: number): void {
    if (isPlatformBrowser(this.platformId)) {
      let cart = this.getCart();
      cart = cart.filter((item) => item.id !== logoId);
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
      this.updateCartLength();
    }
  }

  clearCart(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.cartKey);
      this.updateCartLength();
    }
  }
}
