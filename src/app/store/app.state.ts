import {WeekState} from "./weeks/week.reducer";
import {DaysOffState} from "./days-off/days-off.reducer";

export interface AppState {
  weeks: WeekState,
  daysOff: DaysOffState
}
