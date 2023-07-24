import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductsItemComponent } from './components/products-item/products-item.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [
    ProductsSearchComponent,
    FeaturedProductsComponent,
    ProductsItemComponent,
  ],
  exports: [
    ProductsSearchComponent,
    FeaturedProductsComponent,
    ProductsItemComponent,
  ],
})
export class ProductsModule {}
