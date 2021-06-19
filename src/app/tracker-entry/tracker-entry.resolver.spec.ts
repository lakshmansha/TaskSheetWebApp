import { TestBed } from '@angular/core/testing';

import { TrackerEntryResolver } from './tracker-entry.resolver';

describe('TrackerEntryResolver', () => {
  let resolver: TrackerEntryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TrackerEntryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
