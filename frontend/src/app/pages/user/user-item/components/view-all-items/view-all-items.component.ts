import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NewItem } from '../../../../../models/new-item.model';
import { Announcement } from '../../../../../models/announcement.model';
import { UserItemService } from '../../../../../services/user-item.service';
import { UserAnnouncementService } from '../../../../../services/user-announcement.service';
import { CartService } from '../../../../../services/cart.service'; // ✅ Import CartService

@Component({
  selector: 'app-view-all-items',
  templateUrl: './view-all-items.component.html',
  styleUrls: ['./view-all-items.component.css'],
})
export class ViewAllItemsComponent implements OnInit {
  items: NewItem[] = [];
  filteredItems: NewItem[] = [];
  announcements: Announcement[] = [];
  isLoading = true;
  searchTerm = '';
  sortBy = 'default';
  showModal = false;
  selectedItem: NewItem | null = null;
  showBackToTop = false;
  showAnnouncementBar = true;

  constructor(
    private service: UserItemService,
    private announcementService: UserAnnouncementService,
    private router: Router,
    private cartService: CartService, // ✅ Add CartService to constructor
  ) {}

  ngOnInit(): void {
    this.loadItems();
    this.loadAnnouncements();
  }

  loadItems(): void {
    this.isLoading = true;
    this.service.getAllItems().subscribe({
      next: (data) => {
        console.log('Full item data:', data);
        console.log('First item image field:', data[0]?.imageUrl);
        console.log(
          'All image URLs:',
          data.map((item) => item.imageUrl),
        );

        this.items = data;
        this.filteredItems = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading items:', err);
        this.isLoading = false;
      },
    });
  }

  loadAnnouncements(): void {
    this.announcementService.getAll().subscribe({
      next: (data) => (this.announcements = data),
      error: (err) => console.error('Error loading announcements', err),
    });
  }

  filterItems(): void {
    let filtered = [...this.items];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term),
      );
    }

    switch (this.sortBy) {
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'nameAsc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    this.filteredItems = filtered;
  }

  viewDetails(id: number): void {
    this.router.navigate(['/user/items/details', id]);
  }

  // ✅ Fix addToCart method
  addToCart(item: NewItem): void {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('token');
    if (!isLoggedIn) {
      alert('Please login to add items to cart');
      this.router.navigate(['/login']);
      return;
    }

    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      imageUrl: item.imageUrl,
      total: item.price,
    };

    this.cartService.addToCart(cartItem);
    alert(`${item.name} added to cart! 🛒`);
  }

  quickView(item: NewItem): void {
    this.selectedItem = item;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedItem = null;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterItems();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.sortBy = 'default';
    this.filterItems();
  }

  toggleAnnouncementBar(): void {
    this.showAnnouncementBar = false;
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  formatPrice(price: number): string {
    return price.toLocaleString('en-IN');
  }

  getImageUrl(imageUrl: string): string {
    if (!imageUrl) {
      return 'https://via.placeholder.com/300x250/667eea/ffffff?text=No+Image';
    }
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    return 'http://localhost:8080/api/user/items/images/' + imageUrl;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showBackToTop = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
