import { TestBed } from '@angular/core/testing';

import { TaskEntryService } from './task-entry.service';

describe('TaskEntryService', () => {
  let service: TaskEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
