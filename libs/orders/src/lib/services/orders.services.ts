import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { Order } from '../models/orders';
import { Environment } from '@env/environment'
import { Product } from 'libs/products/src/lib/models/products';

const apiUrl = Environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http : HttpClient) { }
  
  getOrders() : Observable<Order[]> {
    return this.http.get<Order[]>(apiUrl + 'orders');
  }

  getOrder(orderId : string) : Observable<Order> {
    return this.http.get<Order>(apiUrl + 'orders/'+orderId);
  }

  createOrder(order : Order) : Observable<Order> {
    return this.http.post<Order>(apiUrl + 'orders/create', order);
  }

  deleteOrder(orderId : string) : Observable<Order> {
    return this.http.delete<Order>(apiUrl + 'orders/'+orderId);
  }

  updateOrder(orderId : string, orderStatus : {status : string}) : Observable<Order> {
    return this.http.put<Order>(apiUrl + 'orders/'+orderId, orderStatus);
  }

  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(apiUrl + 'orders/get/count')
      .pipe(map((objectValue: any) => objectValue.count)
    );
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(apiUrl + `orders/get/total-sales`)
      .pipe(map((objectValue: any) => objectValue.totalSales
    ));
  }

  getProduct(productId : string) : Observable<Product>{
    return this.http.get<Product>(apiUrl + 'products/'+productId);
  }

}
