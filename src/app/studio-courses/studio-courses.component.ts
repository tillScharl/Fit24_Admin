import { Course } from './../types/course';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BackandService, Response } from '@backand/angular2-sdk';
import { StudioService } from '../studio.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-studio-courses',
  templateUrl: './studio-courses.component.html',
  styleUrls: ['./studio-courses.component.css']
})
export class StudioCoursesComponent implements OnInit {

  selectedStudioName: string;
  trainerId$: Observable<string>;
  courses: Array<Course>;

  constructor(
    private route: ActivatedRoute,
    private backand: BackandService,
    private router: Router,
    private studioService: StudioService
  ) {

  }

  ngOnInit() {
    this.selectedStudioName = this.studioService.getCurrentStudio().studioName;
    console.log(this.selectedStudioName);
    this.backand.object.getOne("studios", this.studioService.currentStudio.id, {
      "pageSize": 20,
      "pageNumber": 1,
      "deep": true
    }).then(response => {
      this.courses = response.data.courses;
      console.log(response.data.courses);
    });
  }

  public showNewCoursePage() {
    this.router.navigate(['/new-course']);
  }

  public showCourseOverviewPage() {
    this.router.navigate(['/studio-overview']);
  }
}
