import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
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
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate(
          '0.6s ease-out',
          style({ opacity: 1, transform: 'translateX(0)' }),
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
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
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
export class AboutComponent {
  // Why Choose Us data
  whyUsReasons = [
    {
      icon: '🚀',
      title: 'Fast Delivery',
      description: 'Get your products delivered within 2-3 business days',
    },
    {
      icon: '💎',
      title: 'Quality Assurance',
      description: '100% quality checked products from verified sellers',
    },
    {
      icon: '🛡️',
      title: 'Secure Payments',
      description: 'Multiple secure payment options with buyer protection',
    },
    {
      icon: '🎯',
      title: 'Best Prices',
      description: 'Competitive prices with exclusive deals and offers',
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your needs',
    },
    {
      icon: '🔄',
      title: 'Easy Returns',
      description: 'Hassle-free 7-day return policy on all products',
    },
  ];

  // Offers data
  offers = [
    {
      icon: '🌟',
      title: 'Quality Products',
      description:
        'A diverse collection of quality-assured products from trusted sellers',
    },
    {
      icon: '🔐',
      title: 'Secure Payments',
      description:
        'Secure and fast online payments with multiple payment options',
    },
    {
      icon: '📦',
      title: 'Real-time Tracking',
      description: 'Track your orders in real-time from dispatch to delivery',
    },
    {
      icon: '🛠️',
      title: 'Seller Tools',
      description:
        'Powerful admin tools for complete seller control and analytics',
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Instant feedback and customer support systems available',
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'A responsive and intuitive user interface for web & mobile',
    },
  ];

  // How It Works steps
  steps = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Sign up for free and create your account in minutes',
    },
    {
      number: '02',
      title: 'Browse Products',
      description: 'Explore thousands of products from verified sellers',
    },
    {
      number: '03',
      title: 'Make Payment',
      description: 'Securely checkout using your preferred payment method',
    },
    {
      number: '04',
      title: 'Get Delivery',
      description: 'Track your order and receive it at your doorstep',
    },
  ];

  // Values data
  values = [
    {
      icon: '👥',
      title: 'Customer First',
      description:
        'Everything we do revolves around delivering an exceptional user experience',
    },
    {
      icon: '💡',
      title: 'Innovation',
      description:
        'We adopt the latest technology to bring new features and improve performance',
    },
    {
      icon: '🔍',
      title: 'Transparency',
      description:
        'Honest listings, secure transactions, and fair return policies',
    },
    {
      icon: '🤝',
      title: 'Trust',
      description:
        'We verify sellers and ensure quality before they list their products',
    },
  ];

  // Testimonials data
  testimonials = [
    {
      text: 'Excellent platform! The quality of products and delivery speed is amazing.',
      name: 'Rajesh Sharma',
      role: 'Regular Buyer',
      avatar: '👨',
      rating: 5,
    },
    {
      text: 'Great experience selling on this marketplace. The seller tools are fantastic!',
      name: 'Priya Patel',
      role: 'Seller',
      avatar: '👩',
      rating: 5,
    },
    {
      text: 'Customer support is very responsive. They solved my issue within hours.',
      name: 'Amit Kumar',
      role: 'Verified Buyer',
      avatar: '👨',
      rating: 4,
    },
    {
      text: "The best online shopping experience I've had. Highly recommended!",
      name: 'Sneha Reddy',
      role: 'Premium Member',
      avatar: '👩',
      rating: 5,
    },
  ];

  // FAQ data
  faqs = [
    {
      question: 'How do I create an account?',
      answer:
        'Click on the Register button, fill in your details, and verify your email address to create an account.',
    },
    {
      question: 'Is it safe to buy on this platform?',
      answer:
        'Yes, we use secure payment gateways and have buyer protection policies in place.',
    },
    {
      question: 'How can I become a seller?',
      answer:
        'Register as a seller, complete your profile, and start listing your products after verification.',
    },
    {
      question: 'What is the return policy?',
      answer:
        'We offer a 7-day easy return policy on most products. Check product details for specific policies.',
    },
    {
      question: 'How long does delivery take?',
      answer:
        'Delivery usually takes 2-5 business days depending on your location.',
    },
  ];

  // Technologies data
  technologies = [
    {
      icon: '🅰️',
      name: 'Angular',
      description:
        'Modern frontend framework for building dynamic single-page applications',
    },
    {
      icon: '☕',
      name: 'Spring Boot',
      description: 'Robust backend framework for scalable and secure REST APIs',
    },
    {
      icon: '🗄️',
      name: 'MySQL',
      description: 'Reliable relational database for secure data storage',
    },
    {
      icon: '☁️',
      name: 'Cloud Hosting',
      description:
        'High availability and scalability with cloud infrastructure',
    },
  ];

  // Achievements data
  achievements = [
    { icon: '👥', number: '50K+', label: 'Active Users' },
    { icon: '🏪', number: '1000+', label: 'Registered Sellers' },
    { icon: '📦', number: '100K+', label: 'Orders Completed' },
    { icon: '⭐', number: '4.8', label: 'Average Rating' },
  ];

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
