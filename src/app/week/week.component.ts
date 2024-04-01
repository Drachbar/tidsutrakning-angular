import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Week } from '../model/week';
import { Day } from '../model/day';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent {
  @Input({ required: true }) week!: Week;
  @Output() weekUpdated = new EventEmitter<Week>();

  updateWeek() {
    this.weekUpdated.emit(this.week);
  }
}
