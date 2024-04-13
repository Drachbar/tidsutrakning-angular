import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {of, switchMap, tap} from "rxjs";
import {daysOff} from "./data";
import {loadDaysOff, loadDaysOffFailure, loadDaysOffSuccess, updateDaysOff} from "./days-off.action";

@Injectable()
export class DaysOffEffects {
  updateDaysOff$ = createEffect(() => this.actions$.pipe(
      ofType(updateDaysOff),
      tap(daysOff => {
        localStorage.setItem('daysOff', JSON.stringify(Array.from(daysOff.daysOff.entries())))
      })
    ),
    {dispatch: false});

  loadDaysOff$ = createEffect(() => this.actions$.pipe(
    ofType(loadDaysOff),
    switchMap(() => {
      try {
        const daysOffData = localStorage.getItem('daysOff');
        const daysOffJson: Map<string, boolean> = daysOffData ? new Map<string, boolean>(JSON.parse(daysOffData)) : daysOff;
        return of(loadDaysOffSuccess({daysOff: daysOffJson}));
      } catch (error) {
        return of(loadDaysOffFailure({error: 'Failed to load weeks from storage'}));
      }
    })
  ));

  constructor(private actions$: Actions) {
  }
}
