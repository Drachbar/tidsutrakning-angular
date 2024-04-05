import {createAction, props} from "@ngrx/store";
import {Week} from "../../model/week";
import {Day} from "../../model/day";


export const addWeek = createAction(
  '[Weeks] Add week',
  props<{ year: number, weekNo: number, days: Day[] }>()
);

export const removeWeek = createAction(
  '[Weeks] Remove week',
  props<{ year: number, weekNo: number }>()
);

export const saveWeeks = createAction(
  '[Weeks] Save Weeks',
  props<{ weeks: Week[]}>()
);

export const loadWeeks = createAction('[Weeks] Load Weeks');

export const loadWeeksSuccess = createAction(
  '[Weeks] Weeks Load Success',
  props<{ weeks: Week[] }>()
)

export const loadWeeksFailure = createAction(
  '[Weeks] Weeks Load Failure',
  props<{ error: string }>()
)
