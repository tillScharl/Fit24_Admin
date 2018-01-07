import { StudioAdmin } from './types/studioAdmin';
import { ParamMap } from '@angular/router';
import { Studio } from './types/studio';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BackandService, Response } from '@backand/angular2-sdk';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class StudioService {

  userRole:string;
  userFirstName:string;
  userLastName:string;
  currentStudio:Studio;

  constructor(
    private authService: AuthService,
    private backand: BackandService
  ) {
    
  }

  getStudios(): Promise<Array<Studio>> {
    if (this.authService.getUserRole() != "Error") {
      this.userRole = this.authService.getUserRole();
    }
    if (this.authService.getUserFirstName() != "Error") {
      this.userFirstName = this.authService.getUserFirstName();
    }
    if (this.authService.getUserLastName() != "Error") {
      this.userLastName = this.authService.getUserLastName();
    }
    if (this.userRole == "Admin") {
      return this.backand.object.getList("studios", {
        "pageSize": 20,
        "pageNumber": 1
      })
        .then((response) => { 
          return response.data;
        })
        .catch(error => { });
    }
    if (this.userRole == "StudioAdmin") {
      return this.authService.getStudioAdminInfo()
      .then((studioAdmin:StudioAdmin) => {
        return this.backand.object.getList("studios", {
          "pageSize": 20,
          "pageNumber": 1,
          "filter": [
            {
              "fieldName": "id",
              "operator": "equals",
              "value": studioAdmin.studio
            }
          ],
          "deep": true
        })
          .then((response) => { 
            return response.data;
          })
          .catch(error => { });
      })
      .catch(error => { });
    }
  }

  setCurrentStudio(studio: Studio) {
    this.currentStudio = studio;
  }

  getCurrentStudio(): Studio {
    return this.currentStudio;
  }

}
