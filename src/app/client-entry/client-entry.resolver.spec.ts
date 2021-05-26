import { TestBed } from '@angular/core/testing';

import { ClientEntryResolver } from './client-entry.resolver';

describe('ClientEntryResolver', () => {
  let resolver: ClientEntryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ClientEntryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
