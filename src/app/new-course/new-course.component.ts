import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackandService, Response } from '@backand/angular2-sdk';
import { StudioService } from '../studio.service';

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
    private studioService: StudioService
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
    console.log(form.value);
    this.backand.object.create('courses', 
    {
      "courseName": form.value.inputName,
      "description": form.value.inputDescription,
      "link": form.value.inputLink,
      "overallPlaces": form.value.inputOverallSeats,
      "bookedPlaces": 0,
      "price": form.value.inputPrice,
      "studio": this.studioService.getCurrentStudio()
    }).then(response => {
      console.log(response);
    });
  }

}
