import { StudioAdmin } from './../types/studioAdmin';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { User } from '../types/user';
import { BackandService, Response } from '@backand/angular2-sdk';

@Injectable()
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false); // {1}
  user: User;
  studioAdmin:StudioAdmin;

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private router: Router,
    private backand: BackandService
  ) {

  }

  login(user: User) {
    if (user.userName !== '' && user.password != '' ) { // {3}
      this.user = user;
      console.log(this.user);
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getStudioAdminInfo(): Promise<any> {
    return this.backand.object.getList("studioAdmins", {
      "pageSize": 20,
      "pageNumber": 1,
      "filter": [
        {
          "fieldName": "firstName",
          "operator": "equals",
          "value": this.user.firstName
        },
        {
          "fieldName": "lastName",
          "operator": "equals",
          "value": this.user.lastName
        }
      ],
      "deep": true
    })
      .then((response) => { 
        this.studioAdmin = response.data[0];
        console.log(response);
        return response.data[0];
      })
      .catch(error => { });
  }

  getUserRole():string {
    if (this.user.role) {
      return this.user.role;
    }
    else { return "Error"}
  }
  getUserFirstName():string {
    if (this.user.firstName) {
      return this.user.firstName;
    }
    else { return "Error"}
  }

  getUserLastName():string {
    if (this.user.lastName) {
      return this.user.lastName;
    }
    else { return "Error"}
  }

}
