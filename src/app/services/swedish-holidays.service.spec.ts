import { TestBed } from '@angular/core/testing';

import { SwedishHolidaysService } from './swedish-holidays.service';

describe('SwedishHolidaysService', () => {
  let service: SwedishHolidaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwedishHolidaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
