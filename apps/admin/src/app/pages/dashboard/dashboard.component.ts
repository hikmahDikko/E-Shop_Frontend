import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@hikmah-tech/orders';
import { ProductsService } from '@hikmah-tech/products';
import { UsersService } from '@hikmah-tech/users';
import { Subject, combineLatest, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  statistics : number[] = [];
  endSubs$ : Subject<any> = new Subject();

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}
    
  ngOnInit(): void {
    combineLatest([
        this.ordersService.getOrdersCount(),
        this.productService.getProductsCount(),
        this.userService.getUsersCount(),
        this.ordersService.getTotalSales()
    ]).pipe(takeUntil(this.endSubs$)).subscribe((values) => {
      //@ts-ignore
      this.statistics = values;
    }); 
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
}
