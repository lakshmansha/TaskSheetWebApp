import { TestBed } from '@angular/core/testing';

import { ClientsResolver } from './clients.resolver';

describe('ClientsResolver', () => {
  let resolver: ClientsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ClientsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
