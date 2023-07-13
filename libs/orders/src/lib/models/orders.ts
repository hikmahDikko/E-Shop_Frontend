import { User } from "@hikmah-tech/users";
import { OrderItem } from "./orderItems";

export class Order{
    id? : string;
    orderItems? : OrderItem[]; 
    shippingAddress1? : string;
    shippingAddress2? : string;
    city? : string;
    zip? : string;
    country? : string;
    phone?: string;
    status? : string;
    totalPrice? : number;
    userId? : User;
    dateOrdered? : string;
}