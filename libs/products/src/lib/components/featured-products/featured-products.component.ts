import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Product } from '../../models/products';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'featured-products',
  templateUrl: './featured-products.component.html'
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  endSubs$ : Subject<any> = new Subject();

  constructor(private productsService : ProductsService) {}
  
  ngOnInit(): void {
    this._getFeaturedProducts()
  }
  
  private _getFeaturedProducts(){
    this.productsService.getFeaturedProduucts(4).pipe(takeUntil(this.endSubs$)).subscribe(products =>{
      this.featuredProducts = products
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
}
