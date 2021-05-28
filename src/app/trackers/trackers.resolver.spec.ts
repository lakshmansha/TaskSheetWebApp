import { TestBed } from '@angular/core/testing';

import { TrackersResolver } from './trackers.resolver';

describe('TrackersResolver', () => {
  let resolver: TrackersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TrackersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
