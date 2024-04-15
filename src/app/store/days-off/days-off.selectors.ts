import {createSelector} from "@ngrx/store";
import {AppState} from "../app.state";
import {DaysOffState} from "./days-off.reducer";

export const selectDaysOff = createSelector(
  (state: AppState) => state.daysOff,
  (state: DaysOffState) => state.daysOff
)
