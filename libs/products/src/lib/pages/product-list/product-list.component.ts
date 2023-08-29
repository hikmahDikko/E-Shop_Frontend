import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products';
import { CategoriesService, Category } from '@hikmah-tech/categories';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy{
  endSubs$ : Subject<any> = new Subject();
  products : Product[] = [];
  categories : Category[] = [];
  isCategoryPage : boolean = false;

  constructor (
    private productsService: ProductsService, 
    private categoriesService : CategoriesService,
    private activatedRoute : ActivatedRoute
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      params['category'] ? this._getProducts([params['category']]) : this._getProducts();
      params['category'] ? this.isCategoryPage = true : this.isCategoryPage = false;
    })
    this._getCategories();
  }

  private _getProducts(categoryId? : string[]){
    this.productsService.getProducts(categoryId).pipe(takeUntil(this.endSubs$)).subscribe(products => {
      this.products = products      
    })
  }

  private _getCategories(){
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(categories => {
      this.categories = categories
    })
  }

  categoryFilter(){
    const selectedCategory = this.categories
      .filter(category => category.checked)
      .map(category => category.id);
    this._getProducts(selectedCategory);
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

}
