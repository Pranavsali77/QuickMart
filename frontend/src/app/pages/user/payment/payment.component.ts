import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  orderData: any = { items: [] };
  totalAmount: number = 0;
  isLoading: boolean = false;
  paymentSuccess: boolean = false;
  orderId: string = '';
  shippingAddress: string = '';

  // Payment method
  selectedPaymentMethod: string = 'cod';

  // UPI fields
  upiId: string = '';
  selectedUpiApp: string = '';

  // Card fields
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  cardholderName: string = '';
  cardType: string = '';

  // Alert properties
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: string = '';

  // UPI Apps list
  upiApps = [
    { name: 'Google Pay', icon: '📱' },
    { name: 'PhonePe', icon: '📱' },
    { name: 'Paytm', icon: '📱' },
    { name: 'BHIM', icon: '📱' },
    { name: 'Amazon Pay', icon: '📱' },
    { name: 'Other UPI', icon: '📱' },
  ];

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.loadCartData();
    this.loadSavedAddress();

    setTimeout(() => {
      this.showAlertMessage(
        '🛒 Please complete your payment to place the order',
        'info',
      );
    }, 500);
  }

  loadCartData(): void {
    const savedCart = localStorage.getItem('checkout_cart');
    if (savedCart) {
      this.orderData = JSON.parse(savedCart);
      if (this.orderData.items && this.orderData.items.length > 0) {
        this.totalAmount = this.orderData.items.reduce(
          (sum: number, item: any) => {
            return sum + (item.price || 0) * (item.quantity || 1);
          },
          0,
        );
      }
    }
  }

  loadSavedAddress(): void {
    const savedAddress = localStorage.getItem('shippingAddress');
    if (savedAddress) {
      this.shippingAddress = savedAddress;
    }
  }

  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
    this.selectedUpiApp = '';
    this.cardType = '';
  }

  selectUpiApp(app: string): void {
    this.selectedUpiApp = app;
  }

  detectCardType(): void {
    const cardNum = this.cardNumber.replace(/\s/g, '');
    if (cardNum.startsWith('4')) {
      this.cardType = 'Visa';
    } else if (cardNum.startsWith('5')) {
      this.cardType = 'Mastercard';
    } else if (cardNum.startsWith('6')) {
      this.cardType = 'RuPay';
    } else if (cardNum.startsWith('3')) {
      this.cardType = 'American Express';
    } else {
      this.cardType = 'Card';
    }
  }

  formatCardNumber(): void {
    let value = this.cardNumber.replace(/\s/g, '');
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    this.cardNumber = value.replace(/(\d{4})/g, '$1 ').trim();
    this.detectCardType();
  }

  isFormValid(): boolean {
    if (!this.shippingAddress.trim()) {
      return false;
    }

    if (this.selectedPaymentMethod === 'upi') {
      return this.upiId.length > 0 && this.selectedUpiApp.length > 0;
    } else if (this.selectedPaymentMethod === 'card') {
      const cardNum = this.cardNumber.replace(/\s/g, '');
      return (
        cardNum.length === 16 &&
        this.expiryDate.length === 5 &&
        this.cvv.length === 3 &&
        this.cardholderName.length > 0
      );
    } else if (this.selectedPaymentMethod === 'cod') {
      return true;
    }
    return false;
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

  placeOrder(): void {
    if (!this.isFormValid()) {
      this.showAlertMessage('Please fill all required fields', 'error');
      return;
    }

    this.isLoading = true;

    const buyerName = localStorage.getItem('username');
    if (!buyerName) {
      this.showAlertMessage('Please login first', 'error');
      this.router.navigate(['/login']);
      return;
    }

    // Save shipping address
    localStorage.setItem('shippingAddress', this.shippingAddress);

    // Get payment platform info and order status
    let paymentPlatformInfo = '';
    let paymentMethodValue = '';
    let orderStatusValue = '';

    if (this.selectedPaymentMethod === 'upi') {
      paymentMethodValue = 'UPI';
      paymentPlatformInfo = `${this.selectedUpiApp} (${this.upiId})`;
      orderStatusValue = 'CONFIRMED'; // ✅ UPI - Confirmed
    } else if (this.selectedPaymentMethod === 'card') {
      paymentMethodValue = 'Card';
      paymentPlatformInfo = `${this.cardType} card ending with ${this.cardNumber.slice(-4)}`;
      orderStatusValue = 'CONFIRMED'; // ✅ Card - Confirmed
    } else if (this.selectedPaymentMethod === 'cod') {
      paymentMethodValue = 'Cash on Delivery';
      paymentPlatformInfo = 'Cash on Delivery';
      orderStatusValue = 'PENDING'; // ✅ COD - Pending
    }

    // Create orders with correct status
    const orders = this.orderData.items.map((item: any) => ({
      itemName: item.name,
      buyer: buyerName,
      price: item.price,
      quantity: item.quantity,
      delivered: false,
      orderStatus: orderStatusValue, // ✅ Using correct status
      orderDate: new Date(),
      shippingAddress: this.shippingAddress,
      paymentMethod: paymentMethodValue,
      paymentPlatform: paymentPlatformInfo,
    }));

    console.log('Orders with payment method:', orders);

    let completed = 0;

    orders.forEach((order: any) => {
      this.http.post('http://localhost:8080/api/sales', order).subscribe({
        next: (res: any) => {
          completed++;
          this.orderId = res.id;

          if (completed === orders.length) {
            this.isLoading = false;
            this.paymentSuccess = true;

            this.showAlertMessage(
              `🎉 Order placed successfully via ${paymentMethodValue}! Order ID: #${this.orderId}. Your order will arrive soon!`,
              'success',
            );

            // Clear cart
            localStorage.removeItem('checkout_cart');
            localStorage.removeItem('cart');
          }
        },
        error: (err) => {
          console.error('Error:', err);
          this.isLoading = false;
          this.showAlertMessage(
            'Failed to place order. Please try again.',
            'error',
          );
        },
      });
    });
  }

  goBackToCart(): void {
    this.router.navigate(['/cart']);
  }

  goToOrders(): void {
    this.router.navigate(['/orders']);
  }

  goToShop(): void {
    this.router.navigate(['/user/items']);
  }

  formatPrice(price: number): string {
    return price?.toLocaleString('en-IN') || '0';
  }
}
