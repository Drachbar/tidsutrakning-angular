import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {addWeek, loadWeeks, loadWeeksFailure, loadWeeksSuccess, removeWeek, saveWeeks} from "./week.actions";
import {of, switchMap, tap, withLatestFrom} from "rxjs";
import {Week} from "../../model/week";
import {selectAllWeeks} from "./week.selectors";
import {AppState} from "../app.state";
import {Store} from "@ngrx/store";

@Injectable()
export class WeekEffects {
  loadWeeks$ = createEffect(() => this.actions$.pipe(
    ofType(loadWeeks),
    switchMap(() => {
      try {
        const weeksData = localStorage.getItem('weeks');
        const weeksJson: Week[] = weeksData ? JSON.parse(weeksData) : [];
        weeksJson.forEach(week => week.days.forEach(day => day.date = new Date(day.date)))
        return of(loadWeeksSuccess({weeks: weeksJson}));
      } catch (error) {
        return of(loadWeeksFailure({error: 'Failed to load weeks from storage'}));
      }
    })
  ));
  saveWeek$ = createEffect(() => this.actions$.pipe(
      ofType(addWeek, removeWeek, saveWeeks),
      withLatestFrom(this.store.select(selectAllWeeks)),
      tap(([, weeks]) => {
        localStorage.setItem('weeks', JSON.stringify(weeks));
      })
    ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {
  }
}
