import { Component, OnInit } from '@angular/core';
import { UsersService } from '@hikmah-tech/users';

@Component({
  selector: 'hikmah-tech-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'eshop';

  constructor(private userService : UsersService){}

  ngOnInit(): void {
    this.userService.initAppSession();
  }
  
}
