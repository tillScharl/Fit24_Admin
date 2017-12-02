import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { User } from './user/user';

@Injectable()
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false); // {1}
  user: User;

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(private router: Router) {

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
}
