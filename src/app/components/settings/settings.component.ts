import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {KeyValuePipe, NgForOf} from "@angular/common";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {selectDaysOff} from "../../store/days-off/days-off.selectors";
import {loadDaysOff, updateDaysOff} from "../../store/days-off/days-off.action";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgForOf,
    KeyValuePipe,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit, OnDestroy {

  daysOff!: Map<string, boolean>;
  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadDaysOff());
    this.store.select(selectDaysOff)
      .pipe(takeUntil(this.destroy$))
      .subscribe(daysOff => this.daysOff = daysOff);
  }

  onToggle(dayKey: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.daysOff.set(dayKey, isChecked);
    this.store.dispatch(updateDaysOff({daysOff: this.daysOff}))
  }

  returnZero() {
    return 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
