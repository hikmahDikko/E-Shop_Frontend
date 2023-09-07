import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@hikmah-tech/users';
import { OrderItem } from '../../models/orderItems';
import { Order } from '../../models/orders';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { OrdersService } from '../../services/orders.services';
import { Subject, take, takeUntil } from 'rxjs';
import { OrderStatus } from '../../shared/order.constants';

@Component({
  selector: 'hikmah-tech-checkout',
  templateUrl: './checkout.component.html',
  styles: [],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId!: string;
  countries = [];
  checkoutFormGroup!: FormGroup;
  endsSub$ : Subject<any> = new Subject();
  
  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService : CartService,
    private orderService : OrdersService,
  ) {}

  ngOnInit(): void {
    this._initCheckoutForm();
    this._autoFillUserData();
    this._getCountries();
    this._getCartItems();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['',],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCountries() {
    //@ts-ignore
    this.countries = this.usersService.getCountries();
  }

  private _getCartItems(){
    const carts : Cart = this.cartService._getCart();
    //@ts-ignore
    this.orderItems = carts.items.map((item) => {
      return{
        product : item.product,
        quantity : item.quantity
      }
    });
  }

  private _autoFillUserData(){
    this.usersService.observeCurrentUser().pipe(takeUntil(this.endsSub$)).subscribe((data) => {
      console.log(data);
      
      //@ts-ignore
      if(data){
        //@ts-ignore
        this.userId = data.id;
        //@ts-ignore
        this.checkoutForm['name'].setValue(data.name);
        //@ts-ignore
        this.checkoutForm['email'].setValue(data.email);
        //@ts-ignore
        this.checkoutForm['street'].setValue(data.street);
        //@ts-ignore
        this.checkoutForm['apartment'].setValue(data.apartment);
        //@ts-ignore
        this.checkoutForm['city'].setValue(data.city);
        //@ts-ignore
        this.checkoutForm['zip'].setValue(data.zip);
        //@ts-ignore
        this.checkoutForm['country'].setValue(data.country);
        //@ts-ignore
        this.checkoutForm['phone'].setValue(data.phone);
      }
    });
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order : Order = {
      orderItems : this.orderItems,
      //@ts-ignore
      name : this.checkoutForm['name'].value,
      email : this.checkoutForm['email'].value,
      //@ts-ignore
      shippingAddress1 : this.checkoutForm['street'].value,
        //@ts-ignore
      shippingAddress2 : this.checkoutForm['apartment'].value,
        //@ts-ignore
      city: this.checkoutForm['city'].value,
        //@ts-ignore
      zip: this.checkoutForm['zip'].value,
        //@ts-ignore
      country : this.checkoutForm['country'].value,
        //@ts-ignore
      phone: this.checkoutForm['phone'].value,
      userId : this.userId,
      dateOrdered : JSON.stringify(Date.now()),
      //@ts-ignore
      status : Object.keys(OrderStatus)[0],
    }

    this.orderService.createOrder(order).pipe(takeUntil(this.endsSub$)).subscribe(
      () => {
        this.cartService.emptyCart();
        this.router.navigateByUrl('/success')
    }, () => {
      //messageService
    })
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  ngOnDestroy(): void {
      this.endsSub$.complete();
  }
}
