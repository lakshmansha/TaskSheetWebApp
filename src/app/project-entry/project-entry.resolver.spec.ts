import { TestBed } from '@angular/core/testing';

import { ProjectEntryResolver } from './project-entry.resolver';

describe('ProjectEntryResolver', () => {
  let resolver: ProjectEntryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProjectEntryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
