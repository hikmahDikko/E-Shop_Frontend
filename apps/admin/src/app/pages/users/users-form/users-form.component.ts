import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@hikmah-tech/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [],
})
export class UsersFormComponent {
  form!: FormGroup;
  isSubmitted : boolean = false;
  editMode = false;
  currentUserId : string = "";
  countries =[];

  constructor (
    private formBuilder : FormBuilder,
    private usersService : UsersService,
    private messageService: MessageService,
    private location : Location,
    private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required],
      street : [''],
      apartment : [''],
      city : [''],
      zip : [''],
      country : [''],
      phone : ['', Validators.required],
      isAdmin : [false],
    });

    this._checkEditMode();
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    const user : User = {
      name: this.userForm['name'].value,
      email : this.userForm['email'].value,
      password : this.userForm['password'].value,
      street : this.userForm['street'].value,
      apartment : this.userForm['apartment'].value,
      city : this.userForm['city'].value,
      zip : this.userForm['zip'].value,
      country : this.userForm['country'].value,
      phone : this.userForm['phone'].value,
      isAdmin : this.userForm['isAdmin'].value,
      id: this.currentUserId,
    };
    if(this.editMode){
      this._updateuser(this.currentUserId, user);
    }else {
      this._adduser(user);
    }

  }

  onCancel(){
    this.location.back();
  }

  private _checkEditMode(){
    this.activatedRoute.params.subscribe(params => {
      if(params['id']){
        this.editMode = true;
        this.currentUserId = params['id'];
        this.usersService.getUser(params['id']).subscribe(users => {
          //@ts-ignore
          this.userForm['name'].setValue(users.data.name);
          //@ts-ignore
          this.userForm['email'].setValue(users.data.email);
          //@ts-ignore
          this.userForm['password'].setValue(users.data.password);
          //@ts-ignore
          this.userForm['zip'].setValue(users.data.zip);
          //@ts-ignore
          this.userForm['phone'].setValue(users.data.phone);
          //@ts-ignore
          this.userForm['apartment'].setValue(users.data.apartment);
          //@ts-ignore
          this.userForm['country'].setValue(users.data.country);
          //@ts-ignore
          this.userForm['street'].setValue(users.data.street);
          //@ts-ignore
          this.userForm['isAdmin'].setValue(users.data.isAdmin);
        })
      }
    })
  }

  private _adduser(user : User){
    this.usersService.createUser(user).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is created Successfully' });
      timer(2000).toPromise().then(done => {
        this.location.back();
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User is not created' });
    });
  }

  private _updateuser(userId: string, user : User){
    this.usersService.updateUser(userId, user).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is updated Successfully' });
      timer(2000).toPromise().then(done => {
        this.location.back();
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User is not updated' });
    });
  }

  get userForm() {
    return this.form.controls;
  }
}
