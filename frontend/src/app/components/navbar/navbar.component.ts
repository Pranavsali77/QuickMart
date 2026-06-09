import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  username = '';
  userRole: string = '';
  cartCount = 0;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();

    // Listen for route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkLoginStatus();
        this.cdr.detectChanges();
      });

    // Listen for storage changes
    window.addEventListener('storage', () => {
      this.checkLoginStatus();
      this.cdr.detectChanges();
    });
  }

  checkLoginStatus(): void {
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    let role = localStorage.getItem('role');

    // Convert role to uppercase for comparison
    role = role ? role.toUpperCase() : '';

    console.log('Checking login status:', { user, hasToken: !!token, role });

    this.isLoggedIn = !!(user && user !== 'null' && user !== '' && token);
    this.username = user || '';
    this.userRole = role;

    if (this.isLoggedIn) {
      this.loadCartCount();
    }

    this.cdr.detectChanges();
  }

  loadCartCount(): void {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.cartCount = cart.length;
    } catch (e) {
      this.cartCount = 0;
    }
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      this.isLoggedIn = false;
      this.username = '';
      this.userRole = '';
      this.cartCount = 0;
      alert('Logged out successfully! 👋');
      window.location.href = '/home';
    }
  }
}
