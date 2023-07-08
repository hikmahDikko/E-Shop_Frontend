import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, Product } from '@hikmah-tech/products';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products : Product[] = [];

  constructor(
    private productsService : ProductsService, 
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private router : Router){}
  
  ngOnInit(): void {
    this._getProducts()
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe((products: Product[])  => {
      this.products = products;
    })
  }

  deleteProduct(productId : string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this product',
      header: 'Delete product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(() => {
        },() => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'product cannot be deleted' });
        });
        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'product is deleted Successfully' });
        this._getProducts();
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

  updateProduct(productId : string) {
   this.router.navigateByUrl(`products/form/${productId}`)
  }

}
