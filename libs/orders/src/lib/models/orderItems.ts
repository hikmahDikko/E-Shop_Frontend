import { Category } from "@hikmah-tech/categories";
import { Product } from "@hikmah-tech/products";

export class OrderItem{
    id? : string;
    product? : Product;
    quantity? : number;
    category? : Category;
}