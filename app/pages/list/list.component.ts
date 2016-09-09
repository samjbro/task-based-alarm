let timer = require('timer');
import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import * as applicationSettings from "application-settings";
import { Page } from 'ui/page';
import { Router } from "@angular/router";
import * as moment from "moment";

@Component({
  selector: "list",
  templateUrl: "pages/list/list.component.html",
})
export class ListPage implements OnInit {

  constructor(private _router: Router) {}

  private _timeString = applicationSettings.getNumber("hour") + ":" + applicationSettings.getNumber("minute");
  private _now = moment();
  private _plusDays = applicationSettings.getNumber("plusDays")
  private _alarmTime = moment(this._timeString, "HH:mm").add(this._plusDays, 'd')
  private _until = this._alarmTime.diff(this._now);

  public formattedAlarmTime = moment(this._timeString, "HH:mm").format("HH:mm");

  ngOnInit() {
    // alert("milliseconds until your alarm: " + moment(this._until))
    // console.log("now time: " + this._now);
    // console.log("alarm time: " + this._alarmTime);
    // console.log("until time: " + this._until);
    // console.log("today?: " + this._plusDays);
    // alert("your alarm time is " + moment(this._until).format("HH:mm"))
    if (global.alarmTimer) {
      timer.clearTimeout(global.alarmTimer);
    }
    global.alarmTimer = timer.setTimeout(() => {
      this._router.navigate(["alarm"]);
    }, this._until)
  }

  seeAlarm() {
    this._router.navigate(["alarm"]);
  }

}
