import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/categories';
import { CategoriesService } from '../../services/categories.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'categories-banner',
  templateUrl: './categories-banner.component.html'
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubs$ : Subject<any> = new Subject();

  constructor (private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(categories => {
      this.categories = categories      
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
}
