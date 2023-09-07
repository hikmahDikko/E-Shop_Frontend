import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { OrdersService } from '../../services/orders.services';
import { CartItemDetails } from '../../models/cartItemDetail';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit, OnDestroy {
  endSubs$ : Subject<any> = new Subject();
  cartItemDetails : CartItemDetails[] = [];
  cartCount : number = 0;

  constructor (
    private router : Router, 
    private cartService : CartService, 
    private orderService : OrdersService,
    private messageService : MessageService
  ){}

  ngOnInit(): void {
    this._getCartDetails();
  }
  
  backToShop() {
    this.router.navigateByUrl("/products");
  }

  private _getCartDetails(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(cart => {
      this.cartItemDetails = [];
      if(cart){
        this.cartCount = cart?.items.length ?? 0;
        cart.items.forEach((item) => {
          this.orderService.getProduct(item.product).pipe(takeUntil(this.endSubs$)).subscribe(data => {
            this.cartItemDetails.push({
              product : data,
              quantity : item.quantity,
            });
          })
        })
      }
    })
  }

  deleteCart(cartItem : CartItemDetails) {
    //@ts-ignore
    this.cartService.deleteCartItem(cartItem.product?.id);
    this.messageService.add({severity:'success', summary:'Success', detail:'Item successfully deleted'});
  }

  updateCartItemQuantity(event : any, item : CartItemDetails) {
    this.cartService.setCartItem({
      //@ts-ignore
      product : item.product?.id,
      quantity : event.value
    }, true);
    this.messageService.add({severity:'success', summary:'Success', detail:'Item successfully updated'});
  }

  ngOnDestroy(): void {
      this.endSubs$.complete();
  }
}
