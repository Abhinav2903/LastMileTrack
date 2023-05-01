import { TestBed } from '@angular/core/testing';

import { LocationtrackerService } from './locationtracker.service';

describe('LocationtrackerService', () => {
  let service: LocationtrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationtrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
