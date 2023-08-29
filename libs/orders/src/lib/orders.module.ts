import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

const routes : Routes = [
  {
    path : "cart",
    component : CartPageComponent
  }
]
@NgModule({
  imports: [
    CommonModule, 
    BadgeModule,
    RouterModule.forChild(routes), 
    ButtonModule,
    InputNumberModule, 
  ],
  declarations: [CartIconComponent, CartPageComponent, CartPageComponent],
  exports: [CartIconComponent, CartPageComponent, CartPageComponent],
})
export class OrdersModule {
  constructor(private cartServices: CartService) {
    cartServices.initialCartStorages();
  }
}
