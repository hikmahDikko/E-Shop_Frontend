import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/products';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartItem, CartService } from '@hikmah-tech/orders';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product!: Product;
  endSub$: Subject<any> = new Subject();
  quantity = 1;

  constructor(private productService: ProductsService, private route : ActivatedRoute, private cartService : CartService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['productId']){
        this._getProduct(params['productId']);
      }
    })
  }

  private _getProduct(id: string){
    this.productService.getProduct(id).pipe(takeUntil(this.endSub$)).subscribe(product => {
      this.product = product;
    }) 
  }

  addProductToCart() {
    const cartItem : CartItem = {
      product : this.product.id,
      quantity : this.quantity
    }
    this.cartService.setCartItem(cartItem)
  }

  ngOnDestroy(): void {
    this.endSub$.complete();
  }
}
