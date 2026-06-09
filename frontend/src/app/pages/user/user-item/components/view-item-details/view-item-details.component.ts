import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserItemService } from 'src/app/services/user-item.service';
import { CartService } from 'src/app/services/cart.service'; // Add this
import { NewItem } from 'src/app/models/new-item.model';

@Component({
  selector: 'app-view-item-details',
  templateUrl: './view-item-details.component.html',
  styleUrls: ['./view-item-details.component.css'],
})
export class ViewItemDetailsComponent implements OnInit {
  item!: NewItem;
  quantity = 1;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private service: UserItemService,
    private cartService: CartService, // Add CartService
    private router: Router,
  ) {}

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    if (!username) {
      alert('Please log in first!');
      this.router.navigate(['/login']);
      return;
    }

    this.loadItemDetails();
  }

  loadItemDetails(): void {
    this.isLoading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getItemById(id).subscribe({
      next: (data) => {
        this.item = data;
        console.log('Fetched item:', this.item);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading item:', err);
        this.isLoading = false;
      },
    });
  }

  getImageUrl(imageUrl: string): string {
    if (!imageUrl) {
      return 'https://via.placeholder.com/600x400/667eea/ffffff?text=Product+Image';
    }

    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }

    return 'http://localhost:8080/api/user/items/images/' + imageUrl;
  }

  onImageError(event: any): void {
    event.target.src =
      'https://via.placeholder.com/600x400/ff6b6b/ffffff?text=Image+Not+Found';
  }

  addToCart(): void {
    // Add to cart using CartService
    const cartItem = {
      id: this.item.id,
      name: this.item.name,
      price: this.item.price,
      quantity: this.quantity,
      imageUrl: this.item.imageUrl,
      total: this.item.price * this.quantity,
    };

    this.cartService.addToCart(cartItem);
    alert(`${this.item.name} added to cart!`);
  }

  // ✅ Modified: Buy Now goes to payment page
  buyNow(): void {
    const buyerName = localStorage.getItem('username');
    if (!buyerName) {
      alert('Please login first!');
      this.router.navigate(['/login']);
      return;
    }

    // Create checkout data for single item
    const checkoutData = {
      items: [
        {
          id: this.item.id,
          name: this.item.name,
          price: this.item.price,
          quantity: this.quantity,
          imageUrl: this.item.imageUrl,
          total: this.item.price * this.quantity,
        },
      ],
      totalAmount: this.item.price * this.quantity,
      totalItems: 1,
    };

    console.log('Buy Now Checkout Data:', checkoutData);
    localStorage.setItem('checkout_cart', JSON.stringify(checkoutData));

    // Navigate to payment page
    this.router.navigate(['/payment']);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('en-IN');
  }

  goBack(): void {
    this.router.navigate(['/user/items']);
  }
}
