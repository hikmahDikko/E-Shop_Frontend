import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductsService } from '@hikmah-tech/products';
import { Product } from '@hikmah-tech/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { CategoriesService, Category } from '@hikmah-tech/categories';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent {
  categories : Category[] = [];
  form!: FormGroup;
  isSubmitted : boolean = false;
  editMode = false;
  currentProductId : string = "";

  constructor (
    private formBuilder : FormBuilder,
    private productsService : ProductsService,
    private categoriesService : CategoriesService,
    private messageService: MessageService,
    private location : Location,
    private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    const product : Product = {
      id: this.currentProductId,
      name: this.productForm['name'].value,
      description : this.productForm['description'].value,
      richDescription : this.productForm['richDescription'].value,
      image : this.productForm['image'].value,
      brand: this.productForm['brand'].value,
      price : this.productForm['price'].value,
      category : this.productForm['category'].value,
      countInStock : this.productForm['countInStock'].value,
      isFeatured : this.productForm['isFeatured'].value,
      dateCreated : this.productForm['created'].value,
    };
    if(this.editMode){
      this._updateProduct(product.id, product);
    }else {
      this._addProduct(product);
    }

  }

  onCancel(){
    this.location.back();
  }

  private _initForm () {
      this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description : ['', Validators.required],
      richDescription : [''],
      image : [''],
      brand: ['', Validators.required],
      price : [0, Validators.required],
      category : ['', Validators.required],
      countInStock : [0, Validators.required],
      isFeatured : ['', Validators.required],
    });
  }

  private _checkEditMode(){
    this.activatedRoute.params.subscribe(params => {
      if(params['id']){
        this.editMode = true;
        this.currentProductId = params['id'];
        this.productsService.getProduct(params['id']).subscribe(products => {
          //@ts-ignore
          this.productForm['name'].setValue(products.data.name);
          //@ts-ignore
          this.productForm['image'].setValue(products.data.image);
          //@ts-ignore
          this.productForm['images'].setValue(products.data.images);
          //@ts-ignore
          this.productForm['description'].setValue(products.data.description);
          //@ts-ignore
          this.productForm['richDescription'].setValue(products.data.richDescription);
          //@ts-ignore
          this.productForm['brand'].setValue(products.data.brand);
          //@ts-ignore
          this.productForm['price'].setValue(products.data.price);
          //@ts-ignore
          this.productForm['category'].setValue(products.data.category);
          //@ts-ignore
          this.productForm['countInStock'].setValue(products.data.countInStock);
          //@ts-ignore
          this.productForm['numReviews'].setValue(products.data.numReviews);
          //@ts-ignore
          this.productForm['isFeatured'].setValue(products.data.isFeatured);
          //@ts-ignore
          this.productForm['created'].setValue(products.data.created);
        })
      }
    })
  }

  private _addProduct(product : Product){
    this.productsService.createProduct(product).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is created Successfully' });
      timer(2000).toPromise().then(done => {
        this.location.back();
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not created' });
    });
  }

  private _updateProduct(productId: string, product : Product){
    this.productsService.updateProduct(productId, product).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated Successfully' });
      timer(2000).toPromise().then(done => {
        this.location.back();
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not updated' });
    });
  }

  private _getCategories(){
    this.categoriesService.getCategories().subscribe(response => {
      this.categories = response
    })
  }

  get productForm() {
    return this.form.controls;
  }
}
