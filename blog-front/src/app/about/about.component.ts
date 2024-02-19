import { Component, OnInit } from "@angular/core";
import * as moment from 'moment';

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  getAge(): number {
    var birthday = new Date("1996-07-29");
    return moment().diff(birthday, 'years');
  }
}
