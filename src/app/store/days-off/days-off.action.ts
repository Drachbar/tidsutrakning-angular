import {createAction, props} from "@ngrx/store";

export const updateDaysOff = createAction(
  '[Days off] Update Days off',
  props<{ daysOff: Map<string, boolean>}>()
)

export const loadDaysOff = createAction('[Days off], Load Days off');

export const loadDaysOffSuccess = createAction(
  '[Days off] Load Success',
  props<{ daysOff: Map<string, boolean>}>()
)

export const loadDaysOffFailure = createAction(
  '[Days off] Load Failure',
  props<{ error: string }>()
)
