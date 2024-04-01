import { Component, Input, OnInit } from '@angular/core';
import { Week } from '../model/week';
import { Day } from '../model/day';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent {
  @Input({ required: true }) week!: Week;

  test(updatedDay: Day) {
    console.log(updatedDay);
  }
}
