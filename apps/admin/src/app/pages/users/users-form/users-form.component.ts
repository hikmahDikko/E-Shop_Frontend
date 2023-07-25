import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@hikmah-tech/users';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import * as CountryList from 'i18n-iso-countries'

//@ts-ignore
declare const require;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [],
})
export class UsersFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isSubmitted : boolean = false;
  editMode = false;
  currentUserId : string = "";
  countries = [];
  endSubs$ : Subject<any> = new Subject();

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
      email : ['', [Validators.required, Validators.email]],
      password : [''],
      street : [''],
      apartment : [''],
      city : [''],
      zip : [''],
      country : [''],
      phone : ['', Validators.required],
      isAdmin : [false],
    });

    this._checkEditMode();
    this._getCountries();
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
          this.userForm['password'].setValidators([]);
          this.userForm['password'].updateValueAndValidity();
        })
      }
    })
  }

  private _adduser(user : User){
    this.usersService.createUser(user).pipe(takeUntil(this.endSubs$)).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is created Successfully' });
      timer(2000).toPromise().then(done => {
        this.location.back();
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User is not created' });
    });
  }

  private _updateuser(userId: string, user : User){
    this.usersService.updateUser(userId, user).pipe(takeUntil(this.endSubs$)).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is updated Successfully' });
      timer(2000).toPromise().then(done => {
        this.location.back();
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User is not updated' });
    });
  }

  private _getCountries() {
    CountryList.registerLocale(require("i18n-iso-countries/langs/en.json"));
    //@ts-ignore
    this.countries = Object.entries(CountryList.getNames("en", {select: "official"})).map(country => {
      return {
        id : country[0],
        name : country[1]
      }
    });
  }

  get userForm() {
    return this.form.controls;
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
}
