import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderStatus, OrdersService } from '@hikmah-tech/orders';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit, OnDestroy {
  orders: Order[] =[];
  orderStatus : any = OrderStatus;
  endSubs$ : Subject<any> = new Subject();

  constructor(
    private ordersService : OrdersService, 
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private router : Router){}
  
  ngOnInit(): void {
    this._getOrders()
  }

  private _getOrders() {
    this.ordersService.getOrders().pipe(takeUntil(this.endSubs$)).subscribe(orders => {  
      this.orders = orders;
    })
  }

  deleteOrder(orderId : string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Order',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).pipe(takeUntil(this.endSubs$)).subscribe(response => {
        },error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Order cannot be deleted' });
        });
        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order is deleted Successfully' });
        this._getOrders();
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
            case ConfirmEventType.CANCEL:
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
              break;
            }
          }
      }); 
  }

  showOrder(orderId : string) {
   this.router.navigateByUrl(`orders/${orderId}`)
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
}
