import {Time} from "@angular/common";

export class Day {
  date: Date;
  dayStart?: Time;
  lunchStart?: Time;
  lunchEnd?: Time;
  dayEnd?: Time;
  sum?: Time;

  constructor(date: Date) {
    this.date = date;
  }

  public calculateWorkedTime(): Time | undefined {
    if (this.dayStart == undefined || this.lunchStart == undefined || this.lunchEnd == undefined || this.dayEnd == undefined)
      return undefined;

    const start = this.timeToMinutes(this.dayStart);
    const lunchStartMinutes = this.timeToMinutes(this.lunchStart);
    const lunchEndMinutes = this.timeToMinutes(this.lunchEnd);
    const end = this.timeToMinutes(this.dayEnd);

    const workedMinutes = (end - lunchEndMinutes) + (lunchStartMinutes - start);
    const workedHours = Math.floor(workedMinutes / 60);
    const workedMinutesRest = workedMinutes % 60;

    this.sum = {hours: workedHours, minutes: workedMinutesRest};
    return this.sum;
  }

  private timeToMinutes(time: Time): number {
    return time.hours * 60 + time.minutes;
  }
}
