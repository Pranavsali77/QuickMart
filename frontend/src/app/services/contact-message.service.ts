import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactMessage } from '../models/contact-message.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactMessageService {
  private baseUrl = 'http://localhost:8080/api/contact';

  constructor(private http: HttpClient) {}

  sendMessage(message: ContactMessage): Observable<ContactMessage> {
    return this.http.post<ContactMessage>(this.baseUrl, message);
  }
}
