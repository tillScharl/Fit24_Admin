import { Component, OnInit } from '@angular/core';
import { NgForm, ValidatorFn, AbstractControl } from '@angular/forms';
import { BackandService, Response } from '@backand/angular2-sdk';
import { StudioService } from '../studio.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent implements OnInit {
  
  dates;
  moment;
  de: any;

  constructor(
    private backand: BackandService,
    private studioService: StudioService,
    private router: Router
  ) { 

  }

  ngOnInit() {
    this.de = {
      firstDayOfWeek: 0,
      dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
      dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "October", "November", "Dezember"],
      monthNamesShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    };
    this.moment = new Date();
  }


  newCourse(form:NgForm) {
    console.log(form);
    this.backand.object.create('courses', 
    {
      "courseName": form.value.inputName,
      "description": form.value.inputDescription,
      "link": form.value.inputLink,
      "overallPlaces": form.value.inputOverallSeats,
      "bookedPlaces": 0,
      "price": form.value.inputPrice,
      "studio": this.studioService.getCurrentStudio(),
      "eventCount":form.value.eventCount,
      "eventDuration": form.value.inputDuration
    }).then(response => {
      console.log(response.data.__metadata.id);
      for(let i = 0; i < form.value.eventCount; i++) {
        let tempDate = new Date(form.value.datePicker);
        tempDate.setDate(tempDate.getDate() + i * 7);
        this.backand.object.create("dates",  
        {
          "startingTime": new Date(tempDate).toISOString(),
          "course": response.data.__metadata.id,
        }).then(newResponse => {
          console.log(newResponse);
        });
      }
      this.showStudioCoursesPage();
    });
  }

  public showStudioCoursesPage() {
    this.router.navigate(['/studio-courses']);
  }
}
