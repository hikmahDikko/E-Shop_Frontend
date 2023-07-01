import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@hikmah-tech/products';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit {
  categories : Category[] = [];
  constructor(private categoryService : CategoriesService){}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }
}
