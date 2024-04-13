import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeekService {

  constructor() { }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  getWeekNumber(date: Date): number {
    const currentDate = new Date(date.getTime());
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setDate(currentDate.getDate() + 3 - (currentDate.getDay() + 6) % 7);
    const yearStart = new Date(currentDate.getFullYear(), 0, 1);
    const diff = currentDate.getTime() - yearStart.getTime();
    return Math.ceil((diff / (86400000 * 7)));
  }

  getWeekDays(year: number, weekNumber: number): Date[] {
    const januaryFirst = new Date(year, 0, 1);
    const daysOffset = 24 * 60 * 60 * 1000;
    const days = (weekNumber - 1) * 7 - (januaryFirst.getDay() + 6) % 7;
    const weekStart = new Date(januaryFirst.getTime() + days * daysOffset);
    weekStart.setDate(weekStart.getDate() + (weekStart.getDay() === 0 ? -6 : 1) - weekStart.getDay());

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart.getTime() + daysOffset * i);
      weekDays.push(day);
    }

    return weekDays;
  }

  getWeekDay(num: number): string {
    const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];
    return days[num];
  }
}
