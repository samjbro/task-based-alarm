import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { SwipeGestureEventData, PinchGestureEventData, RotationGestureEventData } from "ui/gestures";
let sound = require("nativescript-sound");
let timer = require('timer');

@Component({
    selector: "gesture",
    templateUrl: "pages/gesture_task/gesture.component.html",
    // styleUrls : ['gesture.component.css']
})
export class GesturePage implements OnInit {
  private counter: number = 4;
  private taskPassed = false;
  private alarmLooper = {};
  private sounds: any = {
    "Foghorn": sound.create("~/sounds/Foghorn.mp3"),
    "Alarm": sound.create("~/sounds/Alarm_Clock.mp3"),
    "Bomb_Siren": sound.create("~/sounds/Bomb_Siren.mp3"),
    "Railroad": sound.create("~/sounds/Railroad.mp3"),
    "Warning": sound.create("~/sounds/Warning.mp3"),
  };

  constructor(private _router: Router) {}

  private _taskStop() {
    if (this.counter === 0) {
      this._stopAlarm();
      this._router.navigate([""]);
    }
  }

  public get message() : string {
    if (this.counter === 0) {
      return "success!!"
    } else {
      return "Tasks incomplete"
    }
  }

  public playAlarm() {
    this.sounds["Railroad"].play();
    this.alarmLooper = timer.setInterval(() => {
      this.sounds["Railroad"].play();
    }, 10000);
  }

  private _stopAlarm() {
    this.sounds["Railroad"].stop();
    timer.clearInterval(this.alarmLooper);
  }

  ngOnInit() {
    this.playAlarm();
  }

  onLongPress() {
    console.log("LongPress!");
    this.counter--;
    this._taskStop()
    console.log(this.counter)
  }

  onSwipe(args: SwipeGestureEventData) {
      if (args.direction === 2) {
        this.counter--;
        this._taskStop()
        console.log(this.counter)
      }
  }

  onPinch(args: PinchGestureEventData) {
    this.counter--;
    this._taskStop()
    console.log(this.counter)
  }

  onRotate(args: RotationGestureEventData) {
    if (args.rotation > 89) {
      this.counter--;
      this._taskStop()
      console.log(this.counter)
    }
  }



}
