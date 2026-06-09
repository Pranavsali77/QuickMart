import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '0.8s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate(
          '0.6s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate(
          '0.6s ease-out',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate(
          '0.5s ease-out',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
      ]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0.2s ease-out', style({ opacity: 0 }))]),
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate(
          '0.3s ease-out',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
      transition(':leave', [
        animate(
          '0.3s ease-in',
          style({ opacity: 0, transform: 'translateX(100%)' }),
        ),
      ]),
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '0.5s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),
  ],
})
export class ContactUsComponent {
  contact = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  isSubmitting = false;
  showSuccess = false;
  successMessage = '';

  contactInfo = [
    {
      icon: '📍',
      title: 'Visit Us',
      details: '123 Marketplace Lane, Pune, Maharashtra, India',
      sub: 'Monday - Friday, 9am - 6pm',
    },
    {
      icon: '📧',
      title: 'Email Us',
      details: 'admin@marketplace.com',
      sub: 'support@marketplace.com',
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '+91 94056 46523',
      sub: 'Available 24/7 for support',
    },
  ];

  constructor(private http: HttpClient) {}

  submitMessage() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    this.http
      .post('http://localhost:8080/api/contact', this.contact)
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.successMessage = '✅ Message sent successfully!';
          this.showSuccess = true;
          this.resetFormData();

          // Auto-hide success message after 5 seconds
          setTimeout(() => {
            this.showSuccess = false;
          }, 5000);
        },
        error: () => {
          this.isSubmitting = false;
          this.successMessage =
            '❌ Failed to send message. Please try again later.';
          this.showSuccess = true;

          setTimeout(() => {
            this.showSuccess = false;
          }, 5000);
        },
      });
  }

  resetForm(contactForm: any): void {
    this.resetFormData();
    contactForm.resetForm();
  }

  private resetFormData(): void {
    this.contact = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
  }
}
