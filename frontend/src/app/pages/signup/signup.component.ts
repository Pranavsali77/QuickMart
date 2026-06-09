import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  userData = { name: '', email: '', password: '', role: 'USER' };
  showPassword = false;
  loading = false;
  agreed = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  getStrengthWidth(): string {
    const p = this.userData.password;
    if (!p) return '0%';
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return `${(score / 5) * 100}%`;
  }

  getStrengthColor(): string {
    const p = this.userData.password;
    if (!p) return '#transparent';
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 1) return '#f87171';
    if (score <= 3) return '#fbbf24';
    return '#34d399';
  }

  getStrengthLabel(): string {
    const p = this.userData.password;
    if (!p) return '';
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 1) return 'Weak password';
    if (score <= 3) return 'Moderate password';
    return 'Strong password';
  }

  onSignup() {
    this.loading = true;
    this.authService.signup(this.userData).subscribe({
      next: (res) => {
        this.loading = false;
        alert('Signup successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        alert('Signup failed! ' + err.error);
      },
    });
  }
}
