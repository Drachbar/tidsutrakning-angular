import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {WeekState} from "./week.reducer";
import {Week} from "../../model/week";

export const selectWeeks = (state: AppState) => state.weeks;
export const selectAllWeeks = createSelector(
  selectWeeks,
  (state: WeekState) => state.weeks
)
export const selectWeek = (weekNo: number, year: number) => createSelector(
  selectAllWeeks,
  (weeks: Week[]) =>
    weeks.find(week => week.weekNo === weekNo && week.year === year)
)
export const selectFirstWeek = createSelector(
  selectAllWeeks,
  (weeks) => weeks[0]
);
