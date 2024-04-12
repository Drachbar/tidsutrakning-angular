import {Week} from "../../model/week";
import {createReducer, on} from "@ngrx/store";
import {addWeek, loadWeeks, loadWeeksFailure, loadWeeksSuccess, removeWeek, saveWeeks} from "./week.actions";

export interface WeekState {
  weeks: Week[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initalState: WeekState = {
  weeks: [],
  error: null,
  status: 'pending'
}

export const weekReducer = createReducer(
  initalState,
  on(addWeek, (state, { year, weekNo, days }) => ({
    ...state,
    weeks: [{weekNo, year, days}, ...state.weeks]
  })),
  on(removeWeek, (state, {year, weekNo}) => ({
    ...state,
    weeks: state.weeks.filter(week => week.year !== year || week.weekNo !== weekNo)
  })),
  on(saveWeeks, (state, { weeks}) => ({
    ...state,
    weeks: weeks
  })),
  on(loadWeeks, (state): WeekState => ({ ...state, status: 'loading'})),
  on(loadWeeksSuccess, (state, { weeks }): WeekState => ({
    ...state,
    weeks: weeks,
    error: null,
    status: 'success',
  })),
  on(loadWeeksFailure, (state, { error }): WeekState => ({
    ...state,
    error: error,
    status: 'error'
  }))
);
