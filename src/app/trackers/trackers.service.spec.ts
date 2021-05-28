import { TestBed } from '@angular/core/testing';

import { TrackersService } from './trackers.service';

describe('TrackersService', () => {
  let service: TrackersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
