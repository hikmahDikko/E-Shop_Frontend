import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService, User } from '@hikmah-tech/users';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [],
})
export class UsersListComponent implements OnDestroy{
  users : User[] = [];
  endSubs$ : Subject<any> = new Subject();

  constructor(
    private usersService : UsersService, 
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private router : Router){}
  
  ngOnInit(): void {
    this._getUsers()
  }

  private _getUsers() {
    this.usersService.getUsers().pipe(takeUntil(this.endSubs$)).subscribe((users: User[])  => {
      this.users = users;
    })
  }

  deleteUser(userId : string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this User',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).pipe(takeUntil(this.endSubs$)).subscribe(() => {
          this._getUsers();
        },(error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User cannot be deleted' });
        });
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is deleted Successfully' });
        this._getUsers();
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
            case ConfirmEventType.CANCEL:
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
              break;
            }
          }
      }); 
  }
  getCountryName(countryKey: string) {
    if (countryKey) return this.usersService.getCountry(countryKey);
    return;
  }

  updateUser(userId : string) {
   this.router.navigateByUrl(`users/form/${userId}`)
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
}
