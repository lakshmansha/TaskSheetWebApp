import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerEntryComponent } from './tracker-entry.component';

describe('TrackerEntryComponent', () => {
  let component: TrackerEntryComponent;
  let fixture: ComponentFixture<TrackerEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackerEntryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
