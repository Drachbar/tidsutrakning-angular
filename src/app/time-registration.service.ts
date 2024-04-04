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
    const currentData = this.weeks.value;
    const weekExists = currentData.some(week => week.weekNo === weekNo && week.year === year);

    if (weekExists) {
      console.log(`Veckan ${weekNo} för år ${year} finns redan.`);
      return;
    }

    const dateRange = this.weekService.getWeekDays(year, weekNo);
    let days: Day[] = [];
    days.push(...dateRange.map(date => new Day(date)));

    const myWeek = new Week(weekNo, year, days);
    const updatedData = [myWeek, ...currentData];
    this.weeks.next(updatedData);
  }

  updateWeek(updatedWeek: Week) {
    const currentData = this.weeks.value;
    const updatedData = currentData.map(week =>
      week.weekNo === updatedWeek.weekNo && week.year === updatedWeek.year ? updatedWeek : week
    );
    this.weeks.next(updatedData);
  }

  removeWeek(weekToRemove: Week) {
    this.weeks.next(this.weeks.value.filter(week => week !== weekToRemove));
  }
}
