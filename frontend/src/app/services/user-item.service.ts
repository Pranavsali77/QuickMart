import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewItem } from '../models/new-item.model';

@Injectable({
  providedIn: 'root',
})
export class UserItemService {
  private baseUrl = 'http://localhost:8080/api/user/items';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<NewItem[]> {
    return this.http.get<NewItem[]>(this.baseUrl);
  }

  getItemById(id: number): Observable<NewItem> {
    return this.http.get<NewItem>(`${this.baseUrl}/${id}`);
  }

  buyItem(id: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/buy/${id}`, null, {
      responseType: 'text',
    });
  }

  // ✅ Add this method for sending buyer name to backend
  payItem(id: number, buyer: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}/pay/${id}`,
      { buyer },
      {
        responseType: 'text',
      }
    );
  }
}
