import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@hikmah-tech/orders';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { OrderStatus } from '../order.constants';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] =[];
  orderStatus : any = OrderStatus;

  constructor(
    private ordersService : OrdersService, 
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private router : Router){}
  
  ngOnInit(): void {
    this._getOrders()
  }

  private _getOrders() {
    this.ordersService.getOrders().subscribe(orders => {  
      this.orders = orders;
    })
  }

  deleteOrder(orderId : string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Order',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe(response => {
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
}
