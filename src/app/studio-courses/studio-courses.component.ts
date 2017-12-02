import { Course } from './../types/course';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BackandService, Response } from '@backand/angular2-sdk';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-studio-courses',
  templateUrl: './studio-courses.component.html',
  styleUrls: ['./studio-courses.component.css']
})
export class StudioCoursesComponent implements OnInit {

  selectedStudioName$: Observable<string>;
  trainerId$: Observable<string>;
  courses: Array<Course>;

  constructor(
    private route: ActivatedRoute,
    private backand: BackandService,
    private router: Router) {
  }

  ngOnInit() {
    this.selectedStudioName$ = this.route.paramMap
      .map((params) => { return params.get('studioName') });
    console.log(this.selectedStudioName$);
    this.selectedStudioName$
      .subscribe(studio => {
        console.log(studio);
        this.trainerId$ = this.route.paramMap
          .map((para) => { return para.get('trainerId') });
        this.trainerId$.subscribe((trainerId) => {
          this.backand.object.getList("courses", {
            "pageSize": 20,
            "pageNumber": 1,
            "filter": [
              {
                "fieldName": "trainer",
                "operator": "in",
                "value": trainerId
              },
              {
                "fieldName": "studio",
                "operator": "in",
                "value": 1
              }
            ],
            "sort": []
          })
            .then(coursesResponse => {
              this.courses = coursesResponse.data;
              console.log(this.courses);
            });
        });
      });
  }

}
