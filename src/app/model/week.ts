import {Day} from "./day";
import {Time} from "@angular/common";

export interface Week {
    weekNo: number;
    year: number;
    days: Day[];
    sum?: Time;
}
