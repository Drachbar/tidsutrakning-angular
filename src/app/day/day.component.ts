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
  
  constructor(private weekService: WeekService) { }

  updateDay() {
    this.dayUpdated.emit(this.day)
  }

  getWeekDay(num: number) {
    return this.weekService.getWeekDay(num);
  }
}
