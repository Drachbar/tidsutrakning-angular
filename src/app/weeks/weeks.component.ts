import { Component, OnInit } from '@angular/core';
import { TimeRegistrationService } from '../time-registration.service';
import { Observable } from 'rxjs';
import { Week } from '../model/week';

@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.scss']
})
export class WeeksComponent implements OnInit {

  weeks$!: Observable<Week[]>;

  constructor(private timeRegistrationService: TimeRegistrationService) {
  }

  ngOnInit(): void {
    this.weeks$ = this.timeRegistrationService.data$;
  }

  updateWeek(week: Week) {
    this.timeRegistrationService.updateWeek(week);
  }

  removeWeek(week: Week) {
    this.timeRegistrationService.removeWeek(week);
  }
}
