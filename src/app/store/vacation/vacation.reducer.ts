import {VacationTimespan} from "../../model/vacationTimespan";
import {createReducer, on} from "@ngrx/store";
import {addVacation, loadVacationFailure, loadVacations, loadVacationsSuccess} from "./vacation.action";

export interface VacationState {
  vacationsTimespan: VacationTimespan[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: VacationState = {
  vacationsTimespan: [],
  error: null,
  status: 'pending'
}

export const vacationReducer = createReducer(
  initialState,
  on(addVacation, (state, {vacationTimespan}) => ({
    ...state,
    vacationsTimespan: [vacationTimespan, ...state.vacationsTimespan]
  })),
  on(loadVacations, (state): VacationState => ({...state, status: 'loading'})),
  on(loadVacationsSuccess, (state, {vacationsTimespan}): VacationState => ({
    ...state,
    vacationsTimespan: vacationsTimespan,
    error: null,
    status: 'success'
  })),
  on(loadVacationFailure, (state, {error}): VacationState => ({
    ...state,
    error: error,
    status: 'error'
  }))
)
