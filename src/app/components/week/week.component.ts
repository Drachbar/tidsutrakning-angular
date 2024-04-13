import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Week} from '../../model/week';
import {Time} from "@angular/common";
import {Store} from "@ngrx/store";
import {removeWeek} from "../../store/weeks/week.actions";
import {DayComponent} from "../day/day.component";

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit, AfterViewInit {
  @ViewChildren(DayComponent) dayComponents?: QueryList<DayComponent>;
  @Input({required: true}) inputWeek!: Week;

  flex?: Time;
  componentWeek!: Week;
  tempWeek!: Week;
  sum?: Time;
  normalTid?: number;
  saved = true;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.componentWeek = {...this.inputWeek}
    this.tempWeek = {...this.componentWeek}
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateWeek();
      this.normalTid = this.getNormaltid();
    })
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
    if (this.sum === undefined || this.normalTid === undefined) {
      return;
    }
    const flexMinuter = this.timeToMinutes(this.sum) - (this.normalTid * 60)
    return this.minutesToTime(flexMinuter);
  }

  private getNormaltid() {
    if (!this.dayComponents) return;
    const antalRodaDagar = this.dayComponents.toArray().slice(0, 5)
      .filter(day => day.holiday.isHoliday).length;

    return 40 - antalRodaDagar * 8;
  }

  removeWeek() {
    const year = this.componentWeek.year;
    const weekNo = this.componentWeek.weekNo;
    this.store.dispatch(removeWeek({year, weekNo}));
  }

  updateWeek() {
    if (!this.dayComponents) return;
    this.tempWeek.days = this.dayComponents.toArray().map(day => day.componentDay);
    this.sum = this.dayComponents.reduce((acc, child) => {
      if (child.sum) {
        acc.hours += child.sum.hours;
        acc.minutes += child.sum.minutes;
        if (acc.minutes >= 60) {
          acc.hours += Math.floor(acc.minutes / 60);
          acc.minutes %= 60;
        }
      }
      return acc;
    }, {hours: 0, minutes: 0});
    this.flex = this.calculateFlex();
    this.saved = JSON.stringify(this.inputWeek) === JSON.stringify(this.tempWeek);
  }
}
