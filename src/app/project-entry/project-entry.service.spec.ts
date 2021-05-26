import { TestBed } from '@angular/core/testing';

import { ProjectEntryService } from './project-entry.service';

describe('ProjectEntryService', () => {
  let service: ProjectEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
