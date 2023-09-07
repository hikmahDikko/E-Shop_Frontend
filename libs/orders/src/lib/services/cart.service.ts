import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { BehaviorSubject, Subject } from 'rxjs';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //@ts-ignore
  cart$ : BehaviorSubject<Cart> = new BehaviorSubject(this._getCart);
  constructor() { }

  initialCartStorages() {
    const cart : Cart = this._getCart();
    if(!cart){
      const initialCart = {
        items : []
      }
  
      const initialCartJSON = JSON.stringify(initialCart);
      localStorage.setItem(CART_KEY, initialCartJSON);

      this.cart$.next(cart);
    }
  }

  _getCart() : Cart {
    //@ts-ignore
    const cartJSONStringify : string = localStorage.getItem(CART_KEY);
    const cart = JSON.parse(cartJSONStringify);
 
    this.cart$.next(cart);
    return cart
  }


  setCartItem(cartItem : CartItem, updateCartItem? : boolean) : Cart{
    const cart = this._getCart();
    const cartItemExist = cart.items.find((item) => item.product === cartItem.product);

    if(cartItemExist){
      cart?.items.map((item) : any => {
        if(item.product === cartItem.product){
          if(updateCartItem){
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = item.quantity + cartItem.quantity;
          }
          return item;
        }
      })
    } else{
      cart.items.push(cartItem);
    }

    const cartJSON = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJSON);

    this.cart$.next(cart);

    return cart;
  }

  deleteCartItem(productId : string) {
    const cart = this._getCart();

    const newCart = cart.items.filter(item => item.product !== productId);

    cart.items = newCart;

    const cartJSON = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJSON);
    
    this.cart$.next(cart);
   
  }

  emptyCart() {
    const intialCart = {
      items: []
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CART_KEY, intialCartJson);
    this.cart$.next(intialCart);
  }
}
