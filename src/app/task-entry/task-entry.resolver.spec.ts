import { TestBed } from '@angular/core/testing';

import { TaskEntryResolver } from './task-entry.resolver';

describe('TaskEntryResolver', () => {
  let resolver: TaskEntryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TaskEntryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
