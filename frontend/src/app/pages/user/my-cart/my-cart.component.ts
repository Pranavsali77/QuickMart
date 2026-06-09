import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css'],
})
export class MyCartComponent implements OnInit, OnDestroy {
  cart: Cart = { items: [], totalAmount: 0, totalItems: 0 };
  private cartSubscription: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService
      .getCartObservable()
      .subscribe((cart) => {
        this.cart = cart;
      });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  updateQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity < 1) {
      this.removeItem(item);
    } else {
      this.cartService.updateQuantity(item.id, newQuantity);
    }
  }

  removeItem(item: CartItem): void {
    if (confirm(`Remove ${item.name} from cart?`)) {
      this.cartService.removeFromCart(item.id);
    }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      this.cartService.clearCart();
    }
  }

  proceedToCheckout(): void {
    if (this.cart.items.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Calculate total amount properly
    const totalAmount = this.cart.items.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 1);
    }, 0);

    // Store cart for checkout with correct data structure
    const checkoutData = {
      items: this.cart.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
        imageUrl: item.imageUrl,
        total: (Number(item.price) || 0) * (Number(item.quantity) || 1),
      })),
      totalAmount: totalAmount,
      totalItems: this.cart.totalItems,
    };

    console.log('Checkout Data:', checkoutData);
    localStorage.setItem('checkout_cart', JSON.stringify(checkoutData));

    // Navigate to payment page
    this.router.navigate(['/payment']);
  }
  continueShopping(): void {
    this.router.navigate(['/user/items']);
  }

  formatPrice(price: number): string {
    if (!price) return '0';
    return price.toLocaleString('en-IN');
  }

  getImageUrl(imageUrl: string): string {
    if (!imageUrl) {
      return 'https://via.placeholder.com/100x100/667eea/ffffff?text=Product';
    }
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    return 'http://localhost:8080/api/user/items/images/' + imageUrl;
  }

  onImageError(event: any): void {
    event.target.src =
      'https://via.placeholder.com/100x100/ff6b6b/ffffff?text=Image+Not+Found';
  }
}
