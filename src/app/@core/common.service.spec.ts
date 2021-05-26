import { TestBed } from '@angular/core/testing';

import { Common } from './common.service';

describe('CommonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Common = TestBed.get(Common);
    expect(service).toBeTruthy();
  });
});
