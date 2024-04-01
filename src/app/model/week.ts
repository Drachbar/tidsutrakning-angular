import { WeekService } from "../week.service";
import { Day } from "./day";

export class Week {
    weekNo: number;
    year: number;
    days: Day[] = [];

    constructor(weekNo: number, year: number, days: Day[]) {
        this.weekNo = weekNo;
        this.year = year;

        this.days.push(...days);
    }
}