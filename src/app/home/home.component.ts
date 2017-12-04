import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BackandService } from '@backand/angular2-sdk';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  url: string = "";
  disabled: boolean = true;
  name: string = "";
  result: any;
  @ViewChild('inputFile') inputFile: any;

  constructor(private backand: BackandService) { }


  ngAfterViewInit() {

  }

  removeFile() {
    this.backand.file.remove("todo", "files", this.name).then(
      (data: any) => {
        this.disabled = !this.disabled;
        this.url = "";
        console.log(data);
        this.result = data;
      },
      (err: any) => {
        console.log(err);
        this.result = err;
      }
    );
  }

  ngOnInit() {
  }

}
