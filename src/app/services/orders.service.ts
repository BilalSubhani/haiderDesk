import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = environment.API_URL + '/orders';

  constructor(private http: HttpClient) {}

  createOrder(orderData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, orderData);
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateOrderStatus(orderId: string, status: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${orderId}/status`, status);
  }

  deleteOrder(orderId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${orderId}`);
  }
}
