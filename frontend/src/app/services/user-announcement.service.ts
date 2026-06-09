import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement.model';

@Injectable({
  providedIn: 'root',
})
export class UserAnnouncementService {
  private baseUrl = 'http://localhost:8080/api/user/announcements';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.baseUrl);
  }
}
