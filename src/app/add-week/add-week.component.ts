import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WeekService } from '../week.service';

@Component({
  selector: 'app-add-week',
  templateUrl: './add-week.component.html',
  styleUrls: ['./add-week.component.scss']
})
export class AddWeekComponent implements OnInit {

  year!: number;
  week!: number;
  weekInterval!: string;
  
  constructor(private weekService: WeekService) {
  }

  ngOnInit(): void {
    this.year = this.weekService.getCurrentYear();
    this.week = this.weekService.getWeekNumber(new Date());
    this.onInputChange();
  }

  addWeek() {
    this.week++;
    this.onInputChange();
  }

  onInputChange() {
    let dates = this.weekService.getWeekDays(this.year, this.week)
    this.weekInterval = this.getWeekIntervalAsString(dates);
  }

  getWeekIntervalAsString(weekInterval: Date[]): string {
    return weekInterval[0].toLocaleDateString() + " - " + weekInterval[weekInterval.length - 1].toLocaleDateString()
  }

}
