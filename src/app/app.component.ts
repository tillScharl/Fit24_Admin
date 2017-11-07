import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { BackandService, Response } from '@backand/angular2-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
	constructor(private router: Router, private backand:BackandService) { 

  }
  
  ngOnInit(): void {
    this.backand.init({
      appName: 'fit24',
      signUpToken: '28a83618-2ef6-4556-a26e-6c032bfb4534',
      anonymousToken: 'd0157e6f-c09d-40c0-8e97-ec3ea7e692d7',
      runSocket: true
    });
  }
	public navigate(url: any) {
		this.router.navigate([url]);
	}
}

