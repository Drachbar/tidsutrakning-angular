import { Injectable } from '@angular/core';
import { Week } from './model/week';
import { WeekService } from './week.service';
import { Day } from './model/day';

@Injectable({
  providedIn: 'root'
})
export class TimeRegistrationService {

  private weeks: Week[] = [];
  
  constructor(private weekService: WeekService) { }

  addWeek(weekNo: number, year: number) {
    const dateRange = this.weekService.getWeekDays(year, weekNo);
    let days: Day[] = [];
    days.push(...dateRange.map(date => new Day(date)));

    this.weeks.push(new Week(weekNo, year, days))
  }
}
