import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@hikmah-tech/categories';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted : boolean = false;
  editMode = false;
  currentCategoryId : string = "";

  constructor (
    private formBuilder : FormBuilder,
    private categoriesService : CategoriesService,
    private messageService: MessageService,
    private location : Location,
    private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['', Validators.required],
    });

    this._checkEditMode();
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    const category : Category = {
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
      id: this.currentCategoryId,
      color : this.categoryForm['color'].value
    };
    if(this.editMode){
      this._updateCategory(category.id, category);
    }else {
      this._addCategory(category);
    }

  }

  onCancel(){
    this.location.back();
  }

  private _checkEditMode(){
    this.activatedRoute.params.subscribe(params => {
      if(params['id']){
        this.editMode = true;
        this.currentCategoryId = params['id'];
        this.categoriesService.getCategory(params['id']).subscribe(categories => {
          //@ts-ignore
          this.categoryForm['name'].setValue(categories.data.name);
          //@ts-ignore
          this.categoryForm['icon'].setValue(categories.data.icon);
          //@ts-ignore
          this.categoryForm['color'].setValue(categories.data.color);
        })
      }
    })
  }

  private _addCategory(category : Category){
    this.categoriesService.createCategory(category).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is created Successfully' });
      timer(2000).toPromise().then(done => {
        this.location.back();
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not created' });
    });
  }

  private _updateCategory(categoryId: string, category : Category){
    this.categoriesService.updateCategory(categoryId, category).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is updated Successfully' });
      timer(2000).toPromise().then(done => {
        this.location.back();
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not updated' });
    });
  }

  get categoryForm() {
    return this.form.controls;
  }
}
