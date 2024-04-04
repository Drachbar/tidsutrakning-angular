import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Week} from '../model/week';
import {Time} from "@angular/common";

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent {
  @Input({ required: true }) week!: Week;
  @Output() weekUpdated = new EventEmitter<Week>();
  @Output() weekRemoved = new EventEmitter<Week>();

  updateWeek() {
    this.week.calculateWeekTime();
    this.weekUpdated.emit(this.week);
  }

  timeToMinutes(time: Time): number {
    return time.hours * 60 + time.minutes;
  }

  minutesToTime(minutes: number): Time {
    const workedHours = Math.floor(minutes / 60);
    const workedMinutesRest = minutes % 60;
    return {hours: workedHours, minutes: workedMinutesRest}
  }

  calculateFlex() {
    const weekSum = this.week.sum;
    if (weekSum === undefined) {
      return;
    }
    const normalTid = 40 * 60;
    const flexMinuter = this.timeToMinutes(weekSum) - normalTid
    return this.minutesToTime(flexMinuter);
  }

  removeWeek() {
    this.weekRemoved.emit(this.week);
  }
}
