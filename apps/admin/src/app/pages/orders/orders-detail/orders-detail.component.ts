import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@hikmah-tech/orders';
import { OrderStatus } from '../order.constants';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [],
})
export class OrdersDetailComponent implements OnInit{
  order! : Order;
  subTotal! : number;
  orderStatuses = [];
  selectedStatus: any;


  constructor (
    private ordersService : OrdersService, 
    private activatedRoute : ActivatedRoute,
    private messageService : MessageService,
    private location : Location
  ) {}

  ngOnInit(): void {
    this._mapOrderStatuses();
    this._getOrder();
  }

  private _mapOrderStatuses() {
      //@ts-ignore
   this.orderStatuses = Object.keys(OrderStatus).map(key => {
    return {
      id : key,
      //@ts-ignore
      name : OrderStatus[key].label
    }
   });
  }

  private _getOrder(){
    this.activatedRoute.params.subscribe(params => {
      //@ts-ignore
      if(params.id){
        //@ts-ignore
        this.ordersService.getOrder(params.id).subscribe(order => {
          //@ts-ignore
          this.order = order.data;
          //@ts-ignore
          this.selectedStatus = order.data.status;
        })
      }
    })
  }

  onStatusChange(event: Event) {
    //@ts-ignore
    this.ordersService.updateOrder(this.order.id, {status : event.value}).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order Status is updated Successfully' });
      timer(2000).toPromise().then(done => {
        this.location.back();
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Order Status is not updated' });
    });
  }
}
