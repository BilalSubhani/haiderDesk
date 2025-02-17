import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

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

  getCart(): any[] {
    if (isPlatformBrowser(this.platformId)) {
      const cart = localStorage.getItem(this.cartKey);
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }

  addToCart(logo: any): void {
    if (isPlatformBrowser(this.platformId)) {
      const cart = this.getCart();
      if (!cart.find((item) => item._id === logo._id)) {
        cart.push(logo);
        localStorage.setItem(this.cartKey, JSON.stringify(cart));
        this.updateCartLength();
      }
    }
  }

  removeFromCart(logoId: any): void {
    if (isPlatformBrowser(this.platformId)) {
      let cart = this.getCart();
      cart = cart.filter((item) => item._id !== logoId);
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
