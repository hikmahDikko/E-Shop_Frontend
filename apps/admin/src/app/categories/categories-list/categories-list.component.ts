import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@hikmah-tech/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit {
  categories : Category[] = [];
  constructor(private categoryService : CategoriesService, private messageService : MessageService){}
  
  ngOnInit(): void {
    this._getCategories()
  }

  private _getCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  deleteCategory(categoryId : string) {
    this.categoryService.deleteCategory(categoryId).subscribe(response => {
      this._getCategories();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is deleted Successfully' });
    },error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category cannot be deleted' });
    })
  }
}
