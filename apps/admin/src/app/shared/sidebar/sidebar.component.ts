import { Component } from '@angular/core';
import { AuthService } from 'libs/users/src/lib/services/auth.service';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor (private authService: AuthService){}
  
  logOut(){
    this.authService.logOut();
  }
}
