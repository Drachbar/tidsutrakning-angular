import { TestBed } from '@angular/core/testing';

import { TimeRegistrationService } from './time-registration.service';

describe('TimeRegistrationService', () => {
  let service: TimeRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
