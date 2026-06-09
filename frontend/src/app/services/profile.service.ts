import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  // Get user profile
  getUserProfile(username: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/profile/${username}`);
  }

  // Update user profile
  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(
      `${this.apiUrl}/profile/${profile.username}`,
      profile,
    );
  }

  // Change password
  changePassword(
    username: string,
    oldPassword: string,
    newPassword: string,
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, {
      username,
      oldPassword,
      newPassword,
    });
  }
}
