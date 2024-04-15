import {createReducer, on} from "@ngrx/store";
import {loadDaysOff, loadDaysOffFailure, loadDaysOffSuccess, updateDaysOff} from "./days-off.action";

export interface DaysOffState {
  daysOff: Map<string, boolean>
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initalState: DaysOffState = {
  daysOff: new Map<string, boolean>,
  error: null,
  status: 'pending'
}

export const daysOffReducer = createReducer(
  initalState,
  on(updateDaysOff, (state, {daysOff}): DaysOffState => ({
    ...state,
    daysOff: daysOff
  })),
  on(loadDaysOff, (state): DaysOffState => ({ ...state, status: 'loading'})),
  on(loadDaysOffSuccess, (state, {daysOff}): DaysOffState => ({
    ...state,
    daysOff: daysOff,
    error: null,
    status: 'success'
  })),
  on(loadDaysOffFailure, (state, { error }): DaysOffState => ({
    ...state,
    error: error,
    status: 'error'
  }))
);
