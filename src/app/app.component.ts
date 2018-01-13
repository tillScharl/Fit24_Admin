import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BackandService, Response } from '@backand/angular2-sdk';
import { AuthService } from './auth/auth.service';
import { StudioService } from './studio.service';
import "rxjs/add/operator/map";
import { Studio } from './types/studio';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  trainerId = 1;
  studioId: Array<string>;
  studios: Array<Studio>;
  isLoggedIn$: Observable<boolean>;
  title = 'app works!';

  constructor(
    private router: Router,
    private backand: BackandService,
    private authService: AuthService,
    private studioService: StudioService
  ) {
    this.studios = new Array<Studio>();
    this.studioId = new Array();
  }

  ngOnInit(): void {
    this.backand.init({
      appName: 'fit24',
      signUpToken: '1bff3ca1-e763-4994-96d2-e8de08f4e61b',
      anonymousToken: '06ee142e-cccd-4f07-89da-c2cbe4d17403',
      runSocket: true
    });
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedIn$.subscribe(data => {
      if (data) {
        /*this.backand.object.getList("studioAdmins", {
          "pageSize": 5,
          "pageNumber": 1,
          "search": this.authService.user.firstName
        })
          .then(studioAdmins => {
            studioAdmins.data.forEach(studioAdmin => {
              if (this.authService.user.firstName.toUpperCase() == studioAdmin.firstName.toUpperCase() && this.authService.user.lastName.toUpperCase() == studioAdmin.lastName.toUpperCase()) {
                this.trainerId = studioAdmin.employedStudioName;
                console.log(studioAdmin.employedStudioName);
                this.backand.object.getList("courses", {
                  "pageSize": 20,
                  "pageNumber": 1,
                  "filter": [
                    {
                      "fieldName": "trainer",
                      "operator": "in",
                      "value": studioAdmin.id // here
                    }
                  ],
                  "sort": []
                })
                  .then(courses => {
                    courses.data.forEach(response => {
                      console.log(response.studio);
                      if (!this.studioId.includes(response.studio)) {
                        this.studioId.push(response.studio);
                      }
                    });
                    this.backand.object.getList("studios", {
                      "pageSize": 20,
                      "pageNumber": 1,
                      "filter": [
                        {
                          "fieldName": "id",
                          "operator": "equals",
                          "value": this.studioId.join()
                        }
                      ],
                      "sort": []
                    })
                      .then(studios => {
                        studios.data.forEach(studio => {
                          console.log(studio.name);
                          if (!this.studioNames.includes(studio.name)) {
                            this.studioNames.push(studio.name);
                          }
                        });
                      })
                      .catch(error => { });
                  });
              }
            });
          })
          .catch(error => {
            console.log(error);
          });*/
        this.studioService.getStudios()
          .then((studios) => {
            console.log(studios)
            this.studios = studios;
        });
      }
    });
  }

  public navigateToStudio(studio: Studio) {
    this.studioService.setCurrentStudio(studio);
    this.router.navigateByUrl('/files', { skipLocationChange: true });
    this.router.navigate(['/studio-courses']);
  }

  logout() {
    this.backand.signout().then(data => {
      console.log(data);
      this.authService.logout();
    });
  }
}

