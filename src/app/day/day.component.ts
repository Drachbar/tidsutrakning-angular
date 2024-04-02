import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from '../model/day';
import { Time } from '@angular/common';
import { WeekService } from '../week.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {
  @Input({ required: true }) day!: Day;
  @Output() dayUpdated = new EventEmitter<Day>();
  
  sum?: Time 

  constructor(private weekService: WeekService) { }

  updateDay() {
    this.dayUpdated.emit(this.day)

    if (this.day.dayStart && this.day.lunchStart && this.day.lunchEnd && this.day.dayEnd) {
      this.sum = this.calculateWorkedTime(this.day.dayStart, this.day.lunchStart, this.day.lunchEnd, this.day.dayEnd)
      console.log(this.day.dayStart.hours)

      console.log(this.sum)
    }
  }

  getWeekDay(num: number) {
    return this.weekService.getWeekDay(num);
  }

  timeToMinutes(time: Time): number {
    return time.hours * 60 + time.minutes;
  }

  calculateWorkedTime(dayStart: Time, lunchStart: Time, lunchEnd: Time, dayEnd: Time) {
    const start = this.timeToMinutes(dayStart);
    const lunchStartMinutes = this.timeToMinutes(lunchStart);
    const lunchEndMinutes = this.timeToMinutes(lunchEnd);
    const end = this.timeToMinutes(dayEnd);

    const workedMinutes = (end - lunchEndMinutes) + (lunchStartMinutes - start);
    const workedHours = Math.floor(workedMinutes / 60);
    const workedMinutesRest = workedMinutes % 60;

    return { hours: workedHours, minutes: workedMinutesRest };
  }
}
