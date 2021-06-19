import { TestBed } from '@angular/core/testing';

import { ClientEntryService } from './client-entry.service';

describe('ClientEntryService', () => {
  let service: ClientEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
