import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [CategoriesBannerComponent],
  exports: [CategoriesBannerComponent],
})
export class CategoriesModule {}
