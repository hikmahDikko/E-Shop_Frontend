import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductsItemComponent } from './components/products-item/products-item.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@hikmah-tech/ui';
import { ToastModule } from 'primeng/toast';

export const route: Route[] = [
  { path: 'products', component: ProductListComponent },
  { path: 'category/:categoryId', component: ProductListComponent },
  { path: 'products/:productId', component: ProductDetailComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    RouterModule.forRoot(route),
    FormsModule,
    RatingModule,
    InputNumberModule,
    UiModule,
    ToastModule
  ],
  declarations: [
    ProductsSearchComponent,
    FeaturedProductsComponent,
    ProductsItemComponent,
    ProductListComponent,
    ProductDetailComponent,
  ],
  exports: [
    ProductsSearchComponent,
    FeaturedProductsComponent,
    ProductsItemComponent,
    ProductListComponent,
    ProductDetailComponent,
  ],
})
export class ProductsModule {}
