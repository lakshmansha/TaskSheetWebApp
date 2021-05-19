import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEntryComponent } from './task-entry.component';

describe('TaskEntryComponent', () => {
  let component: TaskEntryComponent;
  let fixture: ComponentFixture<TaskEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskEntryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
