import { Injectable } from '@angular/core';
import { Week } from './model/week';
import { WeekService } from './week.service';
import { Day } from './model/day';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeRegistrationService {

  private weeks = new BehaviorSubject<Week[]>([]);
  data$ = this.weeks.asObservable();
  
  constructor(private weekService: WeekService) { }

  addWeek(weekNo: number, year: number) {
    const dateRange = this.weekService.getWeekDays(year, weekNo);
    let days: Day[] = [];
    days.push(...dateRange.map(date => new Day(date)));

    const currentData = this.weeks.value;
    const myWeek = new Week(weekNo, year, days)
    const updatedData = [...currentData, myWeek];
    this.weeks.next(updatedData);
  }

  updateWeek(updatedWeek: Week) {
    const currentData = this.weeks.value;
    const updatedData = currentData.map(week =>
      week.weekNo === updatedWeek.weekNo && week.year === updatedWeek.year ? updatedWeek : week
    );
    this.weeks.next(updatedData);
  }
}
