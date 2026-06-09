import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFeedbackService } from 'src/app/services/user-feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '0.6s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }),
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
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0.2s ease-out', style({ opacity: 0 }))]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.8s ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class UserFeedbackComponent implements OnInit {
  successMessage: string = '';
  itemId: number = 0;
  isSubmitting = false;

  feedback: Feedback = {
    customerName: '',
    email: '',
    message: '',
  };

  constructor(
    private route: ActivatedRoute,
    private feedbackService: UserFeedbackService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.successMessage = params['success'] || '';
      this.itemId = +params['itemId'] || 0;

      // Auto-fill from localStorage
      const storedName = localStorage.getItem('username');
      if (storedName) {
        this.feedback.customerName = storedName;
        // Try to get stored email or generate one
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
          this.feedback.email = storedEmail;
        } else {
          this.feedback.email = storedName + '@example.com';
        }
      }
    });

    // Auto-hide success message after 5 seconds
    if (this.successMessage) {
      setTimeout(() => {
        this.successMessage = '';
      }, 5000);
    }
  }

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    this.feedbackService.submitFeedback(this.feedback).subscribe({
      next: (res) => {
        alert('Thank you for your feedback! 🎉');
        this.router.navigate(['/user/items']);
      },
      error: (err) => {
        console.error('Error submitting feedback:', err);
        alert('Failed to submit feedback. Please try again.');
        this.isSubmitting = false;
      },
    });
  }

  skipFeedback() {
    if (
      confirm('Are you sure you want to skip? You can provide feedback later.')
    ) {
      this.router.navigate(['/user/items']);
    }
  }
}
