import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/products';
import { CartService } from '@hikmah-tech/orders';
import { CartItem } from '@hikmah-tech/orders';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'products-item',
  templateUrl: './products-item.component.html'
})
export class ProductsItemComponent implements OnInit {
  @Input() product!: Product;
  
  constructor(private cartService : CartService, private messageService : MessageService, private location :Location) {}
  
  ngOnInit(): void {
  }

  addProductToCart() {
    const cartItem : CartItem = {
      product : this.product.id,
      quantity : 1
    }
    
    this.cartService.setCartItem(cartItem);
    this.messageService.add({severity:'success', summary:'Success', detail:'Product Successfully Added to Cart'});
  }
}
