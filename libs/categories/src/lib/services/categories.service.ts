import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Category } from '../models/categories';
import {  Environment } from '@env/environment'

const apiUrl = Environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http : HttpClient) { }
  
  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(apiUrl + 'categories');
  }

  getCategory(categoryId : string) : Observable<Category> {
    return this.http.get<Category>(apiUrl + 'categories/'+categoryId);
  }

  createCategory(category : Category) : Observable<Category> {
    return this.http.post<Category>(apiUrl + 'categories/create', category);
  }

  deleteCategory(categoryId : string) : Observable<Category> {
    return this.http.delete<Category>(apiUrl + 'categories/'+categoryId);
  }

  updateCategory(categoryId : string, category : Category) : Observable<Category> {
    return this.http.put<Category>(apiUrl + 'categories/'+categoryId, category);
  }

}
