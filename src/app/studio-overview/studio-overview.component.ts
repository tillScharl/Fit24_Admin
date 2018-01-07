import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BackandService, Response } from '@backand/angular2-sdk';

@Component({
  selector: 'app-studio-overview',
  templateUrl: './studio-overview.component.html',
  styleUrls: ['./studio-overview.component.css']
})
export class StudioOverviewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private backand: BackandService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public showStudioCoursesPage() {
    this.router.navigate(['/studio-courses/Amberg/1']);
  }
}
