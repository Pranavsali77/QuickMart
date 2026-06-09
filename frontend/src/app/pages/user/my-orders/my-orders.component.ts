import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/services/sales.service';

interface Order {
  id: number;
  itemName: string;
  buyer: string;
  price: number;
  delivered: boolean;
  orderStatus: string;
  orderDate: Date;
  shippedDate?: Date;
  deliveredDate?: Date;
  trackingNumber?: string;
  shippingAddress?: string;
  imageUrl?: string;
  quantity?: number;
  courierPartner?: string;
  paymentMethod?: string;
  paymentPlatform?: string;
}

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  isLoading = true;
  searchTerm = '';
  selectedStatus = 'ALL';
  showTrackingModal = false;
  selectedOrder: Order | null = null;
  showAlert = false;
  alertMessage = '';
  alertType = '';

  constructor(
    private salesService: SalesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const buyerName = localStorage.getItem('username');
    if (!buyerName) {
      alert('Please login to view your orders');
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading = true;
    this.salesService.getAllSales().subscribe({
      next: (data: any[]) => {
        this.orders = data
          .filter((order) => order.buyer === buyerName)
          .map((order) => ({
            ...order,
            orderStatus:
              order.orderStatus || (order.delivered ? 'DELIVERED' : 'PENDING'),
            orderDate: order.orderDate ? new Date(order.orderDate) : new Date(),
            shippedDate: order.shippedDate
              ? new Date(order.shippedDate)
              : undefined,
            deliveredDate: order.deliveredDate
              ? new Date(order.deliveredDate)
              : undefined,
            quantity: order.quantity || 1,
            imageUrl: order.imageUrl || 'default.jpg',
            paymentMethod: order.paymentMethod || 'Online',
            paymentPlatform: order.paymentPlatform || '',
          }));
        this.filteredOrders = [...this.orders];
        this.isLoading = false;
        this.checkForStatusUpdates();
      },
      error: (err: any) => {
        console.error('Error loading orders:', err);
        this.isLoading = false;
        this.loadSampleData();
      },
    });
  }

  loadSampleData(): void {
    this.orders = [
      {
        id: 1001,
        itemName: 'HP Victus Laptop',
        buyer: localStorage.getItem('username') || 'user@example.com',
        price: 84999,
        delivered: false,
        orderStatus: 'PENDING',
        orderDate: new Date(),
        quantity: 1,
        imageUrl: 'laptop.jpg',
        paymentMethod: 'Cash on Delivery',
        paymentPlatform: 'COD',
      },
      {
        id: 1002,
        itemName: 'Samsung Galaxy A36',
        buyer: localStorage.getItem('username') || 'user@example.com',
        price: 33999,
        delivered: false,
        orderStatus: 'SHIPPED',
        orderDate: new Date(),
        shippedDate: new Date(),
        trackingNumber: 'DTDC123456',
        quantity: 1,
        imageUrl: 'phone.jpg',
        paymentMethod: 'UPI',
        paymentPlatform: 'Google Pay (user@okhdfcbank)',
      },
    ];
    this.filteredOrders = [...this.orders];
  }

  checkForStatusUpdates(): void {
    this.orders.forEach((order) => {
      const lastShippedAlert = localStorage.getItem(`shipped_${order.id}`);
      const lastDeliveredAlert = localStorage.getItem(`delivered_${order.id}`);

      if (order.orderStatus === 'SHIPPED' && !lastShippedAlert) {
        this.showAlertMessage(
          `🚚 Your order #${order.id} (${order.itemName}) has been shipped!`,
          'shipped',
        );
        localStorage.setItem(
          `shipped_${order.id}`,
          new Date().getTime().toString(),
        );
      }

      if (order.orderStatus === 'DELIVERED' && !lastDeliveredAlert) {
        this.showAlertMessage(
          `✅ Your order #${order.id} (${order.itemName}) has been delivered! Thank you for shopping!`,
          'delivered',
        );
        localStorage.setItem(
          `delivered_${order.id}`,
          new Date().getTime().toString(),
        );
      }
    });
  }

  showAlertMessage(message: string, type: string): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  closeAlert(): void {
    this.showAlert = false;
  }

  filterByStatus(status: string): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  filterOrders(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.orders];

    if (this.selectedStatus !== 'ALL') {
      filtered = filtered.filter(
        (order) => order.orderStatus === this.selectedStatus,
      );
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toString().includes(term) ||
          order.itemName.toLowerCase().includes(term),
      );
    }

    this.filteredOrders = filtered;
  }

  trackOrder(order: Order): void {
    this.selectedOrder = order;
    this.showTrackingModal = true;
  }

  closeTrackingModal(): void {
    this.showTrackingModal = false;
    this.selectedOrder = null;
  }

  cancelOrder(order: Order): void {
    if (order.orderStatus !== 'PENDING') {
      alert('Only pending orders can be cancelled');
      return;
    }

    if (confirm(`Are you sure you want to cancel order #${order.id}?`)) {
      this.salesService.updateOrderStatus(order.id, 'CANCELLED').subscribe({
        next: () => {
          this.loadOrders();
          this.showAlertMessage(
            `❌ Order #${order.id} has been cancelled`,
            'cancelled',
          );
        },
        error: (err) => {
          console.error('Error cancelling order:', err);
          alert('Failed to cancel order');
        },
      });
    }
  }

  reorder(order: Order): void {
    this.router.navigate(['/user/items']);
  }

  writeReview(order: Order): void {
    this.router.navigate(['/user/user-feedback'], {
      queryParams: { itemId: order.id },
    });
  }

  contactSupport(order: Order): void {
    this.router.navigate(['/contact']);
  }

  goToShop(): void {
    this.router.navigate(['/user/items']);
  }

  getImageUrl(imageUrl: string): string {
    if (!imageUrl) {
      return 'https://via.placeholder.com/80x80/667eea/ffffff?text=Product';
    }
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    return 'http://localhost:8080/api/user/items/images/' + imageUrl;
  }

  onImageError(event: any): void {
    event.target.src =
      'https://via.placeholder.com/80x80/667eea/ffffff?text=Product';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'status-pending';
      case 'CONFIRMED':
        return 'status-confirmed'; // ✅ Add this
      case 'SHIPPED':
        return 'status-shipped';
      case 'DELIVERED':
        return 'status-delivered';
      case 'CANCELLED':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'PENDING':
        return '⏳ Pending';
      case 'CONFIRMED':
        return '✅ Confirmed'; // ✅ Add this
      case 'SHIPPED':
        return '🚚 Shipped';
      case 'DELIVERED':
        return '✅ Delivered';
      case 'CANCELLED':
        return '❌ Cancelled';
      default:
        return '⏳ Pending';
    }
  }
  // ✅ Fixed methods to handle undefined
  getPaymentMethodClass(paymentMethod: string | undefined): string {
    const method = paymentMethod?.toLowerCase() || 'online';
    switch (method) {
      case 'cash on delivery':
      case 'cod':
        return 'cod';
      case 'upi':
        return 'upi';
      case 'card':
        return 'card';
      default:
        return 'online';
    }
  }

  getPaymentMethodText(paymentMethod: string | undefined): string {
    const method = paymentMethod?.toLowerCase() || 'online';
    switch (method) {
      case 'cash on delivery':
      case 'cod':
        return 'Cash on Delivery';
      case 'upi':
        return 'UPI';
      case 'card':
        return 'Card';
      default:
        return 'Online';
    }
  }

  formatPrice(price: number): string {
    return price?.toLocaleString('en-IN') || '0';
  }

  getEstimatedDelivery(orderDate?: Date): Date {
    const date = orderDate ? new Date(orderDate) : new Date();
    date.setDate(date.getDate() + 5);
    return date;
  }
}
