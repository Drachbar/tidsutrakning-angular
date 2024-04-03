import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Day} from '../model/day';
import {Time} from '@angular/common';
import {WeekService} from '../week.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {
  @Input({required: true}) day!: Day;
  @Output() dayUpdated = new EventEmitter<Day>();

  dayStart?: string;
  lunchStart?: string;
  lunchEnd?: string;
  dayEnd?: string;

  constructor(private weekService: WeekService) {
  }

  updateDay(time: string | undefined, index: number) {
    if (time == undefined) {
      return;
    }

    if (index === 0) {
      this.day.dayStart = this.convertToTime(time)
    }
    if (index === 1) {
      this.day.lunchStart = this.convertToTime(time)
    }
    if (index === 2) {
      this.day.lunchEnd = this.convertToTime(time)
    }
    if (index === 3) {
      this.day.dayEnd = this.convertToTime(time)
    }

    this.day.calculateWorkedTime();
    this.dayUpdated.emit(this.day)
  }

  convertToTime(timeString: string): Time {
    const parts = timeString.split(":");
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    return {hours: hours, minutes: minutes};
  }

  getWeekDay(num: number) {
    return this.weekService.getWeekDay(num);
  }
}
