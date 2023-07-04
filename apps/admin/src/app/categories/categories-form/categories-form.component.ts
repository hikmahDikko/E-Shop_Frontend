import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@hikmah-tech/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted : boolean = false;

  constructor (
    private formBuilder : FormBuilder,
    private categoriesService : CategoriesService,
    private messageService: MessageService,
    private location : Location
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    const category : Category = {
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
      id: ''
    };
    this.categoriesService.createCategory(category).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is created Successfully' });
      timer(2000).toPromise().then(done => {
        this.location.back();
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not created' });
    });

  }

  get categoryForm() {
    return this.form.controls;
  }
}
