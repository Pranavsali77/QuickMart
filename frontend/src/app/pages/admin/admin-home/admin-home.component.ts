import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  adminName = 'Admin';
  currentDate = new Date();

  stats = {
    totalProducts: 1284,
    totalOrders: 3920,
    totalRevenue: 240000,
    totalUsers: 148,
  };

  recentOrders = [
    {
      id: '1001',
      customerName: 'John Doe',
      itemName: 'Laptop Pro',
      amount: 54999,
      status: 'DELIVERED',
      date: new Date(),
    },
    {
      id: '1002',
      customerName: 'Jane Smith',
      itemName: 'Wireless Mouse',
      amount: 999,
      status: 'SHIPPED',
      date: new Date(),
    },
    {
      id: '1003',
      customerName: 'Mike Johnson',
      itemName: 'Mechanical Keyboard',
      amount: 2499,
      status: 'PENDING',
      date: new Date(),
    },
    {
      id: '1004',
      customerName: 'Sarah Wilson',
      itemName: 'USB-C Hub',
      amount: 1499,
      status: 'DELIVERED',
      date: new Date(),
    },
  ];

  recentFeedbacks = [
    {
      id: 1,
      customerName: 'John Doe',
      message: 'Great product! Fast delivery.',
      date: new Date(),
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      message: 'Excellent quality, will buy again.',
      date: new Date(),
    },
  ];

  constructor(private router: Router) {
    const username = localStorage.getItem('username');
    if (username) {
      this.adminName = username.split('@')[0];
    }
  }

  ngOnInit(): void {
    console.log('Admin dashboard loaded');
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'DELIVERED':
        return 'status-delivered';
      case 'PENDING':
        return 'status-pending';
      case 'SHIPPED':
        return 'status-shipped';
      default:
        return '';
    }
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
