import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { BehaviorSubject, Subject } from 'rxjs';
import {  Location } from '@angular/common'
import { MessageService } from 'primeng/api';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //@ts-ignore
  cart$ : BehaviorSubject<Cart> = new BehaviorSubject(this._getCart);
  constructor( private messageService : MessageService, private location :Location) { }

  initialCartStorages() {
    const cart : Cart = this._getCart();
    if(!cart){
      const initialCart = {
        items : []
      }
  
      const initialCartJSON = JSON.stringify(initialCart);
      localStorage.setItem(CART_KEY, initialCartJSON);
    }
  }

  _getCart() : Cart {
    //@ts-ignore
    const cartJSONStringify : string = localStorage.getItem(CART_KEY);
    const cart = JSON.parse(cartJSONStringify);
 
    this.cart$.next(cart);
    return cart
  }

  // private _setItem() : Cart{
  //   const cart : Cart = localStorage.setItem(CART_KEY, cartJSON);
  //   return 
  // }

  setCartItem(cartItem : CartItem) : Cart{
    const cart = this._getCart();
    const cartItemExist = cart.items.find((item) => item.product === cartItem.product);

    if(cartItemExist){
      cart?.items.map((item) : any => {
        if(item.product === cartItem.product){
          item.quantity = item.quantity + cartItem.quantity;
          return item;
        }
      })
    } else{
      cart.items.push(cartItem);
    }

    const cartJSON = JSON.stringify(cart);
    localStorage.setItem("cart", cartJSON);

    return cart;
  }
}
