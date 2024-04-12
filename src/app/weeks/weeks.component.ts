import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import {Week} from '../model/week';
import {select, Store} from "@ngrx/store";
import {selectAllWeeks} from "../store/weeks/week.selectors";
import {AppState} from "../store/app.state";
import {WeekComponent} from "../week/week.component";
import {loadWeeks, saveWeeks} from "../store/weeks/week.actions";

@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.scss']
})
export class WeeksComponent implements OnInit {
  @ViewChildren(WeekComponent) weekComponents!: QueryList<WeekComponent>;
  storeWeeks$?: Observable<Week[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadWeeks())
    this.storeWeeks$ = this.store.pipe(select(selectAllWeeks));
  }

  save() {
    const weeks = this.weekComponents.toArray().map(week => {
      week.saved = true;
      return week.tempWeek;
    })
    this.store.dispatch(saveWeeks({weeks: weeks}))
  }
}
