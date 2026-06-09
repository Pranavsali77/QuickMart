import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private apiUrl = 'http://localhost:8080/api/sales';
  private userItemsUrl = 'http://localhost:8080/api/user/items';

  constructor(private http: HttpClient) {}

  getAllSales(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserOrders(buyerName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buyer/${buyerName}`);
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }

  // ✅ Buy single item (for direct purchase)
  buyItem(
    itemId: number,
    buyerName: string,
    quantity: number = 1,
  ): Observable<any> {
    const body = { buyer: buyerName, quantity: quantity.toString() };
    return this.http.post(`${this.userItemsUrl}/pay/${itemId}`, body);
  }

  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/admin/status/${id}`, { status });
  }

  updateShippingDetails(
    id: number,
    courierName: string,
    trackingNumber: string,
  ): Observable<any> {
    return this.http.patch(`${this.apiUrl}/admin/shipping/${id}`, {
      courierName,
      trackingNumber,
    });
  }
  addTrackingNumber(id: number, trackingNumber: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/admin/tracking/${id}`, {
      trackingNumber,
    });
  }
}
