import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OrdersService } from '../../services/orders.services';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'orders-summary',
  templateUrl: './order-summary.component.html',
  styles: [],
})
export class OrderSummaryComponent implements OnInit, OnDestroy{
  endSuds$ : Subject<any> = new Subject();
  totalPrice! : number;
  isCheckout = false;

  constructor(
    private router : Router,
    private cartService: CartService, 
    private ordersService : OrdersService,
  ){
    this.router.url.includes('checkout') ? (this.isCheckout = true) : (this.isCheckout = false);
  }
  ngOnInit(): void {
    this._getOrderSummary();
  }
  
  _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSuds$)).subscribe(cart => {
      this.totalPrice = 0;
      if(cart){
        cart.items.map((item) => {
          this.ordersService.getProduct(item.product).pipe(takeUntil(this.endSuds$)).subscribe((product) => {
            //@ts-ignore
            this.totalPrice += product.price * item.quantity;
          })
        })
      }
    })
  }

  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy(): void {
   this.endSuds$.complete();
  }
}
