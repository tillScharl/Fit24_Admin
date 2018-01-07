import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { BackandService } from '@backand/angular2-sdk';
import { AuthService } from './../auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


    ngOnInit() {
    }



    username: string = 'troloolo';
    password: string = 'trollolo';
    auth_type: string = "N/A";
    is_auth_error: boolean = false;
    auth_status: string = null;
    loggedInUser: string = '';


    oldPassword: string = '';
    newPassword: string = '';
    confirmNewPassword: string = '';



    constructor(private backand: BackandService, private authService: AuthService, private router: Router) {
        this.backand.user.getUserDetails().then(
            (data: any) => {
                console.log(data);
                if (data.data) {
                    this.loggedInUser = data.data.username;
                    this.auth_status = 'OK';
                    this.auth_type = data.data.token_type == 'Anonymous' ? 'Anonymous' : 'Token';
                }
                else {
                    this.auth_status = null;
                }
            },
            (err: any) => {
                console.log(err);
                this.loggedInUser = null;
                this.auth_status = null;
                this.auth_type = null;
            }
        );
    }


    public getAuthTokenSimple() {
        this.auth_type = 'Token';
        this.backand.signin(this.username, this.password)
            .then((data: any) => {
                console.log(data);
                this.authService.login({
                    userName: data.data.username,
                    password: this.password, 
                    fullName: data.data.fullName, 
                    lastName: data.data.lastName, 
                    firstName: data.data.firstName, 
                    role: data.data.role
                });
                this.auth_status = 'OK';
                this.is_auth_error = false;
                this.loggedInUser = data.data.username;
                this.username = '';
                this.password = '';
                this.router.navigate(['home']);
            },
            (error: any) => {
                console.log(error);
                let errorMessage: string = error.data.error_description;
                this.auth_status = `Error: ${errorMessage}`;
                this.is_auth_error = true;
                console.log(errorMessage)
                this.auth_status = 'ERROR';
            }
            );
    }

    public useAnonymousAuth() {
        this.backand.useAnonymousAuth();
        this.auth_status = 'OK';
        this.is_auth_error = false;
        this.auth_type = 'Anonymous';
        this.loggedInUser = 'Anonymous';
    }

    public signOut() {
        this.auth_status = null;
        this.backand.signout();
    }



    public changePassword() {
        if (this.newPassword != this.confirmNewPassword) {
            alert('Passwords should match');
            return;
        }
        this.backand.changePassword(this.oldPassword, this.newPassword)
            .then((data: any) => {
                alert('Password changed');
                this.oldPassword = this.newPassword = this.confirmNewPassword = '';
            },
            (err: any) => {
                console.log(err.data.error_description)
            }
            );
    }
}
