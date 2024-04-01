import { Time } from "@angular/common";

export class Day {
    date: Date;
    dayStart?: Time;
    lunchStart?: Time;
    lunchEnd?: Time;
    dayEnd?: Time;

    constructor(date: Date) {
        this.date = date;
    }
}