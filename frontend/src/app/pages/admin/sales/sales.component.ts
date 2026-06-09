import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';

interface Sale {
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
  courierName?: string;
  shippingAddress?: string;
  paymentMethod?: string;
  paymentPlatform?: string;
}

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  sales: Sale[] = [];
  filteredSales: Sale[] = [];
  selectedStatus = 'ALL';
  selectedPayment = 'ALL';
  searchTerm = '';
  isLoading = true;
  showDetailsModal = false;
  showShippingModal = false;
  selectedSale: Sale | null = null;
  courierName: string = '';
  trackingNumber: string = '';

  courierOptions = [
    'DTDC',
    'BlueDart',
    'Delhivery',
    'Amazon Shipping',
    'Flipkart Logistics',
    'Ecom Express',
    'India Post',
    'XpressBees',
    'Shadowfax',
    'Other',
  ];

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.isLoading = true;
    this.salesService.getAllSales().subscribe({
      next: (data: any[]) => {
        this.sales = data.map((sale: any) => ({
          id: sale.id,
          itemName: sale.itemName,
          buyer: sale.buyer,
          price: sale.price,
          delivered: sale.delivered,
          orderStatus:
            sale.orderStatus || (sale.delivered ? 'DELIVERED' : 'PENDING'),
          orderDate: sale.orderDate ? new Date(sale.orderDate) : new Date(),
          shippedDate: sale.shippedDate
            ? new Date(sale.shippedDate)
            : undefined,
          deliveredDate: sale.deliveredDate
            ? new Date(sale.deliveredDate)
            : undefined,
          trackingNumber: sale.trackingNumber || '',
          courierName: sale.courierName || '',
          shippingAddress: sale.shippingAddress || '',
          paymentMethod: sale.paymentMethod || 'Online',
          paymentPlatform: sale.paymentPlatform || '',
        }));
        this.filteredSales = [...this.sales];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading sales:', err);
        this.isLoading = false;
      },
    });
  }

  filterByStatus(status: string): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  filterByPayment(payment: string): void {
    this.selectedPayment = payment;
    this.applyFilters();
  }

  filterSales(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.sales];

    if (this.selectedStatus !== 'ALL') {
      filtered = filtered.filter(
        (sale) => sale.orderStatus === this.selectedStatus,
      );
    }

    if (this.selectedPayment !== 'ALL') {
      filtered = filtered.filter((sale) => {
        const method = sale.paymentMethod?.toUpperCase() || 'ONLINE';
        if (this.selectedPayment === 'COD')
          return method === 'CASH ON DELIVERY' || method === 'COD';
        if (this.selectedPayment === 'UPI') return method === 'UPI';
        if (this.selectedPayment === 'CARD') return method === 'CARD';
        if (this.selectedPayment === 'ONLINE') return method === 'ONLINE';
        return true;
      });
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (sale) =>
          sale.id.toString().includes(term) ||
          sale.itemName.toLowerCase().includes(term) ||
          sale.buyer.toLowerCase().includes(term),
      );
    }

    this.filteredSales = filtered;
  }

  getPaymentCount(paymentType: string): number {
    return this.sales.filter((sale) => {
      const method = sale.paymentMethod?.toUpperCase() || 'ONLINE';
      if (paymentType === 'COD')
        return method === 'CASH ON DELIVERY' || method === 'COD';
      if (paymentType === 'UPI') return method === 'UPI';
      if (paymentType === 'CARD') return method === 'CARD';
      if (paymentType === 'ONLINE') return method === 'ONLINE';
      return false;
    }).length;
  }

  getPaymentTotal(paymentType: string): number {
    return this.sales
      .filter((sale) => {
        const method = sale.paymentMethod?.toUpperCase() || 'ONLINE';
        if (paymentType === 'COD')
          return method === 'CASH ON DELIVERY' || method === 'COD';
        if (paymentType === 'UPI') return method === 'UPI';
        if (paymentType === 'CARD') return method === 'CARD';
        if (paymentType === 'ONLINE') return method === 'ONLINE';
        return false;
      })
      .reduce((sum, sale) => sum + (sale.price || 0), 0);
  }

  getPaymentClass(paymentMethod: string | undefined): string {
    const method = paymentMethod?.toUpperCase() || 'ONLINE';
    if (method === 'CASH ON DELIVERY' || method === 'COD') return 'payment-cod';
    if (method === 'UPI') return 'payment-upi';
    if (method === 'CARD') return 'payment-card';
    return 'payment-online';
  }

  getPaymentIcon(paymentMethod: string | undefined): string {
    const method = paymentMethod?.toUpperCase() || 'ONLINE';
    if (method === 'CASH ON DELIVERY' || method === 'COD') return '💰';
    if (method === 'UPI') return '📱';
    if (method === 'CARD') return '💳';
    return '🌐';
  }

  getPaymentMethodText(paymentMethod: string | undefined): string {
    const method = paymentMethod?.toUpperCase() || 'ONLINE';
    if (method === 'CASH ON DELIVERY' || method === 'COD')
      return 'Cash on Delivery';
    if (method === 'UPI') return 'UPI';
    if (method === 'CARD') return 'Card';
    return 'Online';
  }

  getStatusClass(status: string | undefined): string {
    const statusValue = status || 'PENDING';
    switch (statusValue) {
      case 'PENDING':
        return 'status-pending';
      case 'CONFIRMED':
        return 'status-confirmed';
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

  getStatusText(status: string | undefined): string {
    const statusValue = status || 'PENDING';
    switch (statusValue) {
      case 'PENDING':
        return '⏳ Pending';
      case 'CONFIRMED':
        return '✅ Confirmed';
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

  openShippingModal(sale: Sale): void {
    this.selectedSale = sale;
    this.courierName = sale.courierName || '';
    this.trackingNumber = sale.trackingNumber || '';
    this.showShippingModal = true;
  }

  closeShippingModal(): void {
    this.showShippingModal = false;
    this.selectedSale = null;
    this.courierName = '';
    this.trackingNumber = '';
  }

  saveShippingDetails(): void {
    if (!this.courierName) {
      alert('Please select a courier');
      return;
    }
    if (!this.trackingNumber) {
      alert('Please enter tracking number');
      return;
    }

    this.salesService
      .updateShippingDetails(
        this.selectedSale!.id,
        this.courierName,
        this.trackingNumber,
      )
      .subscribe({
        next: () => {
          alert(
            `✅ Shipping details saved!\nCourier: ${this.courierName}\nTracking: ${this.trackingNumber}`,
          );
          this.updateStatus(this.selectedSale!.id, 'SHIPPED');
          this.closeShippingModal();
        },
        error: (err) => {
          console.error('Error saving shipping details:', err);
          alert('Failed to save shipping details. Please try again.');
        },
      });
  }

  updateStatus(orderId: number, status: string): void {
    let confirmMessage = '';
    switch (status) {
      case 'CONFIRMED':
        confirmMessage = 'Confirm this order?';
        break;
      case 'SHIPPED':
        confirmMessage = 'Mark this order as Shipped?';
        break;
      case 'DELIVERED':
        confirmMessage = 'Mark this order as Delivered?';
        break;
      case 'CANCELLED':
        confirmMessage = 'Cancel this order?';
        break;
      default:
        confirmMessage = `Mark this order as ${status}?`;
    }

    if (confirm(confirmMessage)) {
      this.salesService.updateOrderStatus(orderId, status).subscribe({
        next: () => {
          this.loadSales();
          alert(`Order ${status.toLowerCase()} successfully!`);
        },
        error: (err) => {
          console.error('Error updating status:', err);
          alert('Failed to update status');
        },
      });
    }
  }

  viewOrderDetails(sale: Sale): void {
    this.selectedSale = sale;
    this.showDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedSale = null;
  }

  formatPrice(price: number): string {
    return price?.toLocaleString('en-IN') || '0';
  }
}
