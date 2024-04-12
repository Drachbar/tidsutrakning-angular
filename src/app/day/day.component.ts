import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Day} from '../model/day';
import {Time} from '@angular/common';
import {WeekService} from '../week.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  @Input({required: true}) inputDay!: Day;
  @Output() dayUpdated = new EventEmitter<Day>();

  componentDay!: Day;
  dayStart?: string;
  lunchStart?: string;
  lunchEnd?: string;
  dayEnd?: string;

  constructor(private weekService: WeekService) {
  }

  ngOnInit(): void {
    this.componentDay = {...this.inputDay}
    this.dayStart = this.timeToString(this.componentDay.dayStart);
    this.lunchStart = this.timeToString(this.componentDay.lunchStart);
    this.lunchEnd = this.timeToString(this.componentDay.lunchEnd);
    this.dayEnd = this.timeToString(this.componentDay.dayEnd);
  }

  updateDay() {
    this.componentDay.dayStart = this.convertToTime(this.dayStart)
    this.componentDay.lunchStart = this.convertToTime(this.lunchStart)
    this.componentDay.lunchEnd = this.convertToTime(this.lunchEnd)
    this.componentDay.dayEnd = this.convertToTime(this.dayEnd)

    this.componentDay.sum = this.calculateWorkedTime();
    this.dayUpdated.emit(this.componentDay)
  }

  convertToTime(timeString: string | undefined): Time | undefined{
    if (timeString === undefined) return;
    const parts = timeString.split(":");
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    return {hours: hours, minutes: minutes};
  }

  timeToString(time: Time | undefined): string | undefined {
    if (time === undefined) return undefined;
    const hoursStr = time.hours.toString().padStart(2, '0');
    const minutesStr = time.minutes.toString().padStart(2, '0');
    return `${hoursStr}:${minutesStr}`;
  }

  getWeekDay(num: number) {
    return this.weekService.getWeekDay(num);
  }

  calculateWorkedTime(): Time | undefined {
    if (this.componentDay.dayStart == undefined || this.componentDay.lunchStart == undefined ||
      this.componentDay.lunchEnd == undefined || this.componentDay.dayEnd == undefined)
      return undefined;

    const start = this.timeToMinutes(this.componentDay.dayStart);
    const lunchStartMinutes = this.timeToMinutes(this.componentDay.lunchStart);
    const lunchEndMinutes = this.timeToMinutes(this.componentDay.lunchEnd);
    const end = this.timeToMinutes(this.componentDay.dayEnd);

    const workedMinutes = (end - lunchEndMinutes) + (lunchStartMinutes - start);
    const workedHours = Math.floor(workedMinutes / 60);
    const workedMinutesRest = workedMinutes % 60;

    return {hours: workedHours, minutes: workedMinutesRest};
  }

  private timeToMinutes(time: Time): number {
    return time.hours * 60 + time.minutes;
  }
}
