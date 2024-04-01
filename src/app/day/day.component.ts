import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from '../model/day';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {
  @Input({ required: true }) day!: Day;
  @Output() dayUpdated = new EventEmitter<Day>();
  
  tidIn() {
    this.dayUpdated.emit(this.day)
  }
}
