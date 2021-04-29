import { TestBed } from '@angular/core/testing';

import { HabitDataService } from './habit-data.service';

describe('HabitDataService', () => {
  let service: HabitDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
