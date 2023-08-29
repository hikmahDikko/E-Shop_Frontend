import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductsService } from '@hikmah-tech/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import { CategoriesService, Category } from '@hikmah-tech/categories';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit, OnDestroy{
  categories : Category[] = [];
  form!: FormGroup ;
  isSubmitted : boolean = false;
  editMode = false;
  currentProductId : string = "";
  imageDisplay! : string | ArrayBuffer;
  endSubs$ : Subject<any> = new Subject();

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
    const productformData = new FormData();
    
    Object.keys(this.productForm).map(key => {
      productformData.append(key, this.productForm[key].value);
    });
    
    if(this.editMode){
      this._updateProduct(this.currentProductId, productformData);
    }else {
      this._addProduct(productformData);
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
      image : ['', Validators.required],
      brand: ['', Validators.required],
      price : [0, Validators.required],
      category : ['', Validators.required],
      countInStock : [0, Validators.required],
      isFeatured : [false],
    });
  }

  private _checkEditMode(){
    this.activatedRoute.params.subscribe(params => {
      if(params['id']){
        this.editMode = true;
        this.currentProductId = params['id'];
        this.productsService.getProduct(params['id']).subscribe(product => { 
          this.productForm['name'].setValue(product.name);
          //@ts-ignore
          this.imageDisplay = product.image;
          this.productForm['description'].setValue(product.description);
          this.productForm['richDescription'].setValue(product.richDescription);
          this.productForm['brand'].setValue(product.brand);
          this.productForm['price'].setValue(product.price);
          //@ts-ignore
          this.productForm['category'].setValue(product.category.id);
          this.productForm['countInStock'].setValue(product.countInStock);
          this.productForm['isFeatured'].setValue(product.isFeatured);
          this.productForm['image'].setValidators([]);
          this.productForm['image'].updateValueAndValidity();
        })
      }
    })
  }

  private _addProduct(product : FormData){
    this.productsService.createProduct(product).pipe(takeUntil(this.endSubs$)).subscribe(response => { 
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is created Successfully' });
      timer(2000).toPromise().then(done => {
        this.location.back();
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not created' });
    });
  }

  private _updateProduct(productId: string, product : FormData){
    this.productsService.updateProduct(productId, product).pipe(takeUntil(this.endSubs$)).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated Successfully' });
      timer(2000).toPromise().then(done => {
        this.location.back();
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not updated' });
    });
  }

  private _getCategories(){
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(response => {
      this.categories = response
    })
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];

    if(file){
      this.form.patchValue({image : file});
      this.form.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        //@ts-ignore
        this.imageDisplay = reader.result;
      }
      reader.readAsDataURL(file);
    }
  }

  get productForm() {
    return this.form.controls;
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
}
