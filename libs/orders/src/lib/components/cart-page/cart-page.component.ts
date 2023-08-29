import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { OrdersService } from '../../services/orders.services';
import { CartItemDeatils } from '../../models/cartItemDetail';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit, OnDestroy {
  endSubs$ : Subject<any> = new Subject();
  cartItemDetails : CartItemDeatils[] = [];

  constructor (private router : Router, private cartService : CartService, private orderService : OrdersService){}

  ngOnInit(): void {
    this._getCartDetails();
  }
  
  backToShop() {
    this.router.navigateByUrl("/products");
  }

  private _getCartDetails(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(cart => {
      cart.items.forEach((item) => {
        this.orderService.getProduct(item.product).pipe(takeUntil(this.endSubs$)).subscribe(product => {
          this.cartItemDetails.push({
            product,
            quantity : item.quantity,
          });
        })
      })
    })
  }
  deleteCart() {
 
  }

  ngOnDestroy(): void {
      this.endSubs$.complete();
  }
}
