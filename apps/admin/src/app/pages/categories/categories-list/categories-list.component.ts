import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@hikmah-tech/categories';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories : Category[] = [];
  endSubs$ : Subject<any> = new Subject();

  constructor(
    private categoryService : CategoriesService, 
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private router : Router){}
  
  ngOnInit(): void {
    this._getCategories();
  }

  private _getCategories() {
    this.categoryService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(categories => {
      this.categories = categories;
    })
  }

  deleteCategory(categoryId : string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.deleteCategory(categoryId).pipe(takeUntil(this.endSubs$)).subscribe(response => {
        },error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category cannot be deleted' });
        });
        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is deleted Successfully' });
        this._getCategories();
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
            case ConfirmEventType.CANCEL:
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
              break;
            }
          }
      }); 
  }

  updateCategory(categoryId : string) {
   this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
}
