import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Week} from '../model/week';
import {Time} from "@angular/common";
import {Store} from "@ngrx/store";
import {removeWeek} from "../store/weeks/week.actions";
import {DayComponent} from "../day/day.component";

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  @ViewChildren(DayComponent) dayComponents!: QueryList<DayComponent>;
  @Input({ required: true }) inputWeek!: Week;

  flex?: Time;
  componentWeek!: Week;
  tempWeek!: Week;

  saved = true;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.componentWeek = {...this.inputWeek}
    this.tempWeek = {...this.componentWeek}
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
    const weekSum = this.tempWeek.sum;
    if (weekSum === undefined) {
      return;
    }
    const normalTid = 40 * 60;
    const flexMinuter = this.timeToMinutes(weekSum) - normalTid
    return this.minutesToTime(flexMinuter);
  }

  removeWeek() {
    const year = this.componentWeek.year;
    const weekNo = this.componentWeek.weekNo;
    this.store.dispatch(removeWeek({year, weekNo}));
  }

  updateWeek() {
    this.tempWeek.days = this.dayComponents.toArray().map(day => day.componentDay);
    this.tempWeek.sum = this.calculateWeekTime(this.tempWeek);
    this.flex = this.calculateFlex();
    this.saved = JSON.stringify(this.inputWeek) === JSON.stringify(this.tempWeek);
  }

  calculateWeekTime(week: Week) {
    let sumMinutes: number = 0;
    week.days.forEach(day => {
      if (day.sum) {
        sumMinutes += this.timeToMinutes(day.sum);
      }
    })
    const workedHours = Math.floor(sumMinutes / 60);
    const workedMinutesRest = sumMinutes % 60;
    return {hours: workedHours, minutes: workedMinutesRest};
  }
}
