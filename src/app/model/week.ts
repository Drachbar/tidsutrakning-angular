import {Day} from "./day";
import {Time} from "@angular/common";

export class Week {
    weekNo: number;
    year: number;
    days: Day[] = [];
    sum?: Time;

    constructor(weekNo: number, year: number, days: Day[]) {
        this.weekNo = weekNo;
        this.year = year;

        this.days.push(...days);
    }

    calculateWeekTime() {
      let sumMinutes: number = 0;
      this.days.forEach(day => {
        if (day.sum) {
          sumMinutes += this.timeToMinutes(day.sum);
        }
      })
      const workedHours = Math.floor(sumMinutes / 60);
      const workedMinutesRest = sumMinutes % 60;
      this.sum = {hours: workedHours, minutes: workedMinutesRest}
      return this.sum;
    }

  private timeToMinutes(time: Time): number {
    return time.hours * 60 + time.minutes;
  }
}
