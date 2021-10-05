import { TestBed } from '@angular/core/testing';

import { ReportsResolver } from './reports.resolver';

describe('ReportsResolver', () => {
  let resolver: ReportsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ReportsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
