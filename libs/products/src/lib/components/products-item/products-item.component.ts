import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/products';

@Component({
  selector: 'products-item',
  templateUrl: './products-item.component.html'
})
export class ProductsItemComponent implements OnInit {
  @Input() product!: Product;

  constructor() {}
  
  ngOnInit(): void {
  }
}
