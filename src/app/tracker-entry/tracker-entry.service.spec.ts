import { TestBed } from '@angular/core/testing';

import { TrackerEntryService } from './tracker-entry.service';

describe('TrackerEntryService', () => {
  let service: TrackerEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackerEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
