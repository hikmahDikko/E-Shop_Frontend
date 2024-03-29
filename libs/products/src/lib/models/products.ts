import { Category } from "../../../../categories/src/lib/models/categories"

export class Product {
    id!: string;
    name? : string;
    description? : string;
    richDescription? : string;
    image? : string;
    images? : string[];
    brand? : string;
    price? :  number;
    quantity? :  number;
    category? : Category;
    countInStock? : number;
    rating? : number;
    numReviews? : number;
    isFeatured? : boolean;
    dateCreated? : string
};