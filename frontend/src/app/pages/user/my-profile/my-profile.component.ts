import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  profile: Profile = {
    username: '',
    email: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    profilePicture: '',
    joinDate: '',
  };

  isLoading = true;
  isEditing = false;
  showChangePassword = false;

  passwordData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(
    private profileService: ProfileService,
    public router: Router, // Changed from private to public
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const username = localStorage.getItem('username');
    if (!username) {
      alert('Please login first');
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading = true;
    this.profileService.getUserProfile(username).subscribe({
      next: (data) => {
        this.profile = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        // If profile doesn't exist, create a default one
        this.profile.username = username;
        this.profile.email = localStorage.getItem('email') || '';
        this.isLoading = false;
      },
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    this.isLoading = true;
    this.profileService.updateProfile(this.profile).subscribe({
      next: (data) => {
        this.profile = data;
        this.isEditing = false;
        this.isLoading = false;
        alert('Profile updated successfully! ✅');
        // Update stored email if changed
        localStorage.setItem('email', this.profile.email);
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        this.isLoading = false;
        alert('Failed to update profile. Please try again.');
      },
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.loadProfile(); // Reload original data
  }

  toggleChangePassword(): void {
    this.showChangePassword = !this.showChangePassword;
    this.passwordData = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  changePassword(): void {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (this.passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    this.isLoading = true;
    this.profileService
      .changePassword(
        this.profile.username,
        this.passwordData.oldPassword,
        this.passwordData.newPassword,
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.showChangePassword = false;
          alert('Password changed successfully! 🔒');
        },
        error: (err) => {
          console.error('Error changing password:', err);
          this.isLoading = false;
          alert('Failed to change password. Please check your old password.');
        },
      });
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      this.router.navigate(['/home']);
      alert('Logged out successfully! 👋');
    }
  }

  getProfilePicture(): string {
    if (this.profile.profilePicture) {
      return this.profile.profilePicture;
    }
    return `https://ui-avatars.com/api/?name=${this.profile.fullName || this.profile.username}&background=667eea&color=fff&size=120`;
  }

  formatDate(date?: string): string {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
