import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcement.model';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css'],
})
export class AnnouncementComponent implements OnInit {
  announcements: Announcement[] = [];
  newAnnouncement: Announcement = {
    title: '',
    message: '',
    date: '',
  };
  isLoading = false;
  searchTerm = '';
  sortBy: 'date' | 'title' = 'date';

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.isLoading = true;
    this.announcementService.getAll().subscribe({
      next: (data) => {
        this.announcements = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading announcements:', err);
        this.isLoading = false;
      },
    });
  }

  get filteredAnnouncements(): Announcement[] {
    let filtered = [...this.announcements];

    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.message.toLowerCase().includes(term),
      );
    }

    // Apply sorting
    if (this.sortBy === 'date') {
      filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    } else if (this.sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }

  submit(): void {
    if (!this.newAnnouncement.title || !this.newAnnouncement.message) {
      return;
    }

    this.newAnnouncement.date = new Date().toISOString();
    this.isLoading = true;

    this.announcementService.create(this.newAnnouncement).subscribe({
      next: () => {
        this.newAnnouncement = { title: '', message: '', date: '' };
        this.loadAnnouncements();
      },
      error: (err) => {
        console.error('Error creating announcement:', err);
        this.isLoading = false;
      },
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this announcement?')) {
      this.isLoading = true;
      this.announcementService.delete(id).subscribe({
        next: () => {
          this.loadAnnouncements();
        },
        error: (err) => {
          console.error('Error deleting announcement:', err);
          this.isLoading = false;
        },
      });
    }
  }

  editAnnouncement(announcement: Announcement): void {
    // Implement edit functionality
    this.newAnnouncement = { ...announcement };
    // Scroll to form
    document
      .querySelector('.add-announcement-card')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  clearForm(): void {
    this.newAnnouncement = { title: '', message: '', date: '' };
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.sortBy = 'date';
  }

  getTimeAgo(date: string): string {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60)
      return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffDays < 30)
      return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return past.toLocaleDateString();
  }

  isHighPriority(announcement: Announcement): boolean {
    // Consider announcements with certain keywords as high priority
    const priorityKeywords = ['urgent', 'important', 'maintenance', 'critical'];
    const text = (
      announcement.title +
      ' ' +
      announcement.message
    ).toLowerCase();
    return priorityKeywords.some((keyword) => text.includes(keyword));
  }
}
