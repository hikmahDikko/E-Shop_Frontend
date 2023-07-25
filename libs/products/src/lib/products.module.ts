import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductsItemComponent } from './components/products-item/products-item.component';
import { ButtonModule } from 'primeng/button';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { Route, RouterModule } from '@angular/router';


export const route: Route[] = [
  { path: "products", component: ProductListComponent}
];

@NgModule({
  imports: [CommonModule, ButtonModule, RouterModule.forRoot(route)],
  declarations: [
    ProductsSearchComponent,
    FeaturedProductsComponent,
    ProductsItemComponent,
    ProductListComponent,
  ],
  exports: [
    ProductsSearchComponent,
    FeaturedProductsComponent,
    ProductsItemComponent,
    ProductListComponent,
  ],
})
export class ProductsModule {}
