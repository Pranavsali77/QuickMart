import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'shopping_cart';
  private cartSubject = new BehaviorSubject<Cart>(this.getCart());

  constructor() {}

  // Get cart as observable
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  // Get current cart
  getCart(): Cart {
    const cartData = localStorage.getItem(this.cartKey);
    if (cartData) {
      return JSON.parse(cartData);
    }
    return { items: [], totalAmount: 0, totalItems: 0 };
  }

  // Add item to cart
  addToCart(item: CartItem): void {
    const cart = this.getCart();
    const existingItem = cart.items.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.total = existingItem.price * existingItem.quantity;
    } else {
      item.total = item.price * item.quantity;
      cart.items.push(item);
    }

    this.updateCart(cart);
  }

  // Update cart
  updateCart(cart: Cart): void {
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalAmount = cart.items.reduce((sum, item) => sum + item.total, 0);

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  // Remove item from cart
  removeFromCart(itemId: number): void {
    const cart = this.getCart();
    cart.items = cart.items.filter((item) => item.id !== itemId);
    this.updateCart(cart);
  }

  // Update item quantity
  updateQuantity(itemId: number, quantity: number): void {
    if (quantity < 1) {
      this.removeFromCart(itemId);
      return;
    }

    const cart = this.getCart();
    const item = cart.items.find((i) => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      item.total = item.price * quantity;
      this.updateCart(cart);
    }
  }

  // Clear cart
  clearCart(): void {
    localStorage.removeItem(this.cartKey);
    this.cartSubject.next({ items: [], totalAmount: 0, totalItems: 0 });
  }

  // Get cart count
  getCartCount(): number {
    return this.getCart().totalItems;
  }
}
