import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  showPassword = false;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin() {
    this.loading = true;
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        // Save ALL required data
        const userRole =
          res.role ||
          (this.loginData.email === 'admin@example.com' ? 'ADMIN' : 'USER');

        localStorage.setItem('username', this.loginData.email);
        localStorage.setItem('token', res.token || 'dummy-token-' + Date.now());
        localStorage.setItem('role', userRole);
        localStorage.setItem('email', this.loginData.email);

        console.log('Login successful - Saved data:', {
          username: this.loginData.email,
          role: userRole,
          hasToken: !!localStorage.getItem('token'),
        });

        this.loading = false;

        // ✅ FIX: Redirect to correct admin dashboard URL
        if (userRole === 'ADMIN') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/user/items';
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Login error:', err);
        alert('Invalid credentials');
      },
    });
  }
}
