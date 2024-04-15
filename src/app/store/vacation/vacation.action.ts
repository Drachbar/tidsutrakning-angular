import {createAction, props} from "@ngrx/store";
import {VacationTimespan} from "../../model/vacationTimespan";

export const addVacation = createAction(
  '[Vacation] Add Vacation',
  props<{vacationTimespan: VacationTimespan}>()
);

export const loadVacations = createAction('[Vacation] Load Vacations');

export const loadVacationsSuccess = createAction(
  '[Vacation] Load Success',
  props<{vacationsTimespan: VacationTimespan[]}>()
)

export const loadVacationFailure = createAction(
  '[Vacation Load Failure]',
  props<{error: string}>()
)
