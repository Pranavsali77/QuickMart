import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  filteredFeedbacks: Feedback[] = [];
  isLoading = false;
  searchTerm = '';
  sortBy: 'name' | 'email' = 'name';
  showReplyModal = false;
  selectedFeedback: Feedback | null = null;
  replyMessage = '';

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.isLoading = true;
    this.feedbackService.getAll().subscribe({
      next: (data) => {
        this.feedbacks = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Failed to load feedbacks', err);
        this.isLoading = false;
      },
    });
  }

  applyFilters(): void {
    let filtered = [...this.feedbacks];

    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.customerName.toLowerCase().includes(term) ||
          f.email.toLowerCase().includes(term) ||
          f.message.toLowerCase().includes(term),
      );
    }

    // Apply sorting
    if (this.sortBy === 'name') {
      filtered.sort((a, b) => a.customerName.localeCompare(b.customerName));
    } else if (this.sortBy === 'email') {
      filtered.sort((a, b) => a.email.localeCompare(b.email));
    }

    this.filteredFeedbacks = filtered;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilters();
  }

  deleteFeedback(id: number): void {
    if (confirm('Are you sure you want to delete this feedback?')) {
      this.isLoading = true;
      this.feedbackService.delete(id).subscribe({
        next: () => {
          this.feedbacks = this.feedbacks.filter((f) => f.id !== id);
          this.applyFilters();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('❌ Delete failed', err);
          this.isLoading = false;
        },
      });
    }
  }

  replyToFeedback(feedback: Feedback): void {
    this.selectedFeedback = feedback;
    this.showReplyModal = true;
    this.replyMessage = '';
  }

  sendReply(): void {
    if (this.replyMessage.trim() && this.selectedFeedback) {
      console.log('Sending reply to:', this.selectedFeedback.email);
      console.log('Reply message:', this.replyMessage);
      alert(
        `Reply sent to ${this.selectedFeedback.customerName} at ${this.selectedFeedback.email}`,
      );
      this.closeModal();
    }
  }

  closeModal(): void {
    this.showReplyModal = false;
    this.selectedFeedback = null;
    this.replyMessage = '';
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getAvatarColor(name: string): string {
    const colors = [
      'linear-gradient(135deg, #00d4ff 0%, #7b2cbf 100%)',
      'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
      'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }
}
