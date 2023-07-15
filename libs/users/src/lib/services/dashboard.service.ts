import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiUrl = Environment.apiUrl + 'orders';
  
  constructor(private http : HttpClient) {}

  getTotalSales() :  Observable<any>{
    return this.http.get(this.apiUrl + '/get/total-sales');
  }

  getOrderCounts() : Observable<any>{
    return this.http.get(this.apiUrl + '/get/count');
  }
}
