import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BackandService, Response } from '@backand/angular2-sdk';
import { AuthService } from './auth/auth.service';
import "rxjs/add/operator/map";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  trainerId: string;
  studioId: Array<string>;
  studioNames: Array<string>;
  isLoggedIn$: Observable<boolean>;
  title = 'app works!';

  constructor(private router: Router, private backand: BackandService, private authService: AuthService) {
    this.studioNames = new Array();
    this.studioId = new Array();
  }

  ngOnInit(): void {
    this.backand.init({
      appName: 'fit24',
      signUpToken: '61a1b5c6-17f2-4d53-9069-b6669485e19d',
      anonymousToken: 'd0157e6f-c09d-40c0-8e97-ec3ea7e692d7',
      runSocket: true
    });
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedIn$.subscribe(data => {
      if (data) {
        if (this.authService.user.role == "Admin") {
          this.backand.object.getList("trainers", {
            "pageSize": 5,
            "pageNumber": 1,
            "search": this.authService.user.firstName
          })
            .then(trainers => {
              trainers.data.forEach(trainer => {
                if (this.authService.user.firstName.toUpperCase() == trainer.firstName.toUpperCase() && this.authService.user.lastName.toUpperCase() == trainer.lastName.toUpperCase()) {
                  this.trainerId = trainer.id;
                  console.log(trainer.id);
                  this.backand.object.getList("courses", {
                    "pageSize": 20,
                    "pageNumber": 1,
                    "filter": [
                      {
                        "fieldName": "trainer",
                        "operator": "in",
                        "value": trainer.id // here
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
            });
        }
      }
    });
  }

  public navigateToStudio(studioName: string) {
    this.router.navigateByUrl('/files', { skipLocationChange: true });
    this.router.navigate(['/studio-courses', studioName, this.trainerId]);
  }
}

