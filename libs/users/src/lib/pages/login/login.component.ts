import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLogin: boolean = false;
  authError: boolean = false;
  authMessage : string = "E-mail or Password is wrong";

  constructor (
    private formBuilder : FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router : Router,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    })
  }

  onLogin(){
    this.isLogin = true;

    if(this.form.invalid) return;

    this.authService.logIn(this.userForm['email'].value, this.userForm['password'].value).subscribe((user) => {
      if(user){
        this.authError = false;
        //@ts-ignore
        this.localStorageService.setToken(user.token);
        this.router.navigate(['/']);
      }
    }, (error : HttpErrorResponse) => {
      this.authError = true;
      if(error.status !== 400){
        this.authMessage = "Error in the server, please try again later!.";
      }
    })
  }
  get userForm(){
    return this.form.controls;
  }
}
