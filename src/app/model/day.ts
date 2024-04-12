import {Time} from "@angular/common";

export interface Day {
  date: Date;
  dayStart?: Time;
  lunchStart?: Time;
  lunchEnd?: Time;
  dayEnd?: Time;
  sum?: Time;
}
