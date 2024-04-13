import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeekService} from '../../services/week.service';
import {select, Store} from "@ngrx/store";
import {addWeek} from "../../store/weeks/week.actions";
import {Day} from "../../model/day";
import {selectFirstWeek} from "../../store/weeks/week.selectors";
import {AppState} from "../../store/app.state";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-add-week',
  templateUrl: './add-week.component.html',
  styleUrls: ['./add-week.component.scss']
})
export class AddWeekComponent implements OnInit, OnDestroy {

  year!: number;
  week!: number;
  weekInterval!: string;
  private destroy$ = new Subject<void>();

  constructor(private weekService: WeekService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.year = this.weekService.getCurrentYear();
    this.store.pipe(select(selectFirstWeek))
      .pipe(takeUntil(this.destroy$))
      .subscribe(week => week ?
        this.week = week.weekNo + 1 : this.week = this.weekService.getWeekNumber(new Date()));

    this.onInputChange();
  }

  addWeek() {
    const dates = this.weekService.getWeekDays(this.year, this.week);
    const days: Day[] = [];
    days.push(...dates.map(myDate => {
      return {date: myDate}
    }));

    const year = this.year;
    const weekNo = this.week;

    this.store.dispatch(addWeek({year, weekNo, days}))
    this.onInputChange();
  }

  onInputChange() {
    let dates = this.weekService.getWeekDays(this.year, this.week)
    this.weekInterval = this.getWeekIntervalAsString(dates);
  }

  getWeekIntervalAsString(weekInterval: Date[]): string {
    return weekInterval[0].toLocaleDateString() + " - " + weekInterval[weekInterval.length - 1].toLocaleDateString()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
