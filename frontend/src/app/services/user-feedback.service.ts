import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root',
})
export class UserFeedbackService {
  private baseUrl = 'http://localhost:8080/api/user/feedback';

  constructor(private http: HttpClient) {}

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.baseUrl, feedback);
  }
}
