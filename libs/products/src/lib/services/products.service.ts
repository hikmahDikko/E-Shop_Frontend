import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { Product } from '../models/products';
import {  Environment } from '@env/environment'

const apiUrl = Environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }
  
  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl + 'products');
  }

  getProduct(productId : string) : Observable<Product> {
    return this.http.get<Product>(apiUrl + 'products/'+productId);
  }

  createProduct(product : FormData) : Observable<Product> {
    return this.http.post<Product>(apiUrl + 'products/create', product);
  }

  deleteProduct(productId : string) : Observable<Product> {
    return this.http.delete<Product>(apiUrl + 'products/'+productId);
  }

  updateProduct(productId : string, product : FormData) : Observable<Product> {
    return this.http.put<Product>(apiUrl + 'products/'+productId, product);
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(apiUrl + 'products/get/count')
      .pipe(map((objectValue: any) => objectValue.count));
  }
}
