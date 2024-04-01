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

  private data$!: Observable<Week[]>;

  constructor(private timeRegistrationService: TimeRegistrationService) {
  }

  ngOnInit(): void {
    this.data$ = this.timeRegistrationService.data$;
  }
}
