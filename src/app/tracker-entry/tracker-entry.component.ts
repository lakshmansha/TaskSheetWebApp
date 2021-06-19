import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Logger, UntilDestroy, untilDestroyed } from '@app/@core';
import { IClient, IProject, ITask, ITracker } from '@app/@core/interface';
import { TrackerEntryService } from './tracker-entry.service';
import { CredentialsService } from '@app/auth';

const log = new Logger('Task Entry');

declare global {
  interface Window {
    toastr: any;
  }
}

let toastr = window.toastr; // ok now

declare var $: any;

@UntilDestroy()
@Component({
  selector: 'app-tracker-entry',
  templateUrl: './tracker-entry.component.html',
  styleUrls: ['./tracker-entry.component.scss'],
})
export class TrackerEntryComponent implements OnInit {
  //#region Switch Variables

  view: string;
  btnView: string;
  trackerId: string;

  //#endregion

  error: string | undefined;
  entryForm!: FormGroup;
  isLoading = false;
  ClientList: IClient[] = [];
  ProjectList: IProject[] = [];
  TaskList: ITask[] = [];
  filteredProject: IProject[] = [];
  filteredTask: ITask[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private trackerEntryService: TrackerEntryService,
    private credentialsService: CredentialsService
  ) {
    toastr.options = { positionClass: 'toast-top-right' };
    this.createForm();
  }

  ngOnInit(): void {
    this.PageLoad();
  }

  PageLoad() {
    this.ClientList = this.route.snapshot.data.responses['Clients'];
    this.ProjectList = this.route.snapshot.data.responses['Projects'];
    this.TaskList = this.route.snapshot.data.responses['Tasks'];

    this.assignCopy();
    const trackerEntry = this.route.snapshot.data.responses['Entry'];
    if (trackerEntry !== undefined) {
      this.updateForm(trackerEntry);
    } else {
      this.trackerId = '';
      this.btnView = 'Create new Tracker';
      this.view = 'Add';
      this.LoadCheckIn(new Date());
      this.LoadCheckOut(new Date());
      const taskId = this.route.snapshot.queryParams['taskId'];
      if (taskId) this.updateFormByTask(taskId);
    }
  }

  LoadCheckIn(date: Date) {
    $('#checkIn').datetimepicker({
      sideBySide: true,
      defaultDate: date,
    });

    $('#checkIn').on('change.datetimepicker', (e: any) => {
      var formatedValue = e.date._d;

      this.entryForm.patchValue({
        checkIn: formatedValue,
      });
      console.log(formatedValue);
    });
  }

  LoadCheckOut(date: Date) {
    $('#checkOut').datetimepicker({
      sideBySide: true,
      defaultDate: date,
    });

    $('#checkOut').on('change.datetimepicker', (e: any) => {
      var formatedValue = e.date._d;

      this.entryForm.patchValue({
        checkOut: formatedValue,
      });
      console.log(formatedValue);
    });
  }

  assignCopy() {
    this.filteredProject = Object.assign([]);
    this.filteredTask = Object.assign([]);
  }

  filterProject(id: string) {
    if (!id) {
      this.assignCopy();
    } // when nothing has typed
    this.filteredProject = Object.assign([], this.ProjectList).filter((item) => item.clientId === id);
  }

  filterTask(id: string) {
    if (!id) {
      this.filteredTask = Object.assign([]);
    } // when nothing has typed
    this.filteredTask = Object.assign([], this.TaskList).filter((item: ITask) => item.projectId === id);
  }

  trackerEntry() {
    this.isLoading = true;
    const task$ =
      this.trackerId !== ''
        ? this.trackerEntryService.update(this.trackerId, this.entryForm.value)
        : this.trackerEntryService.add(this.entryForm.value);
    task$
      .pipe(
        finalize(() => {
          this.entryForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (tracker) => {
          log.debug(`${tracker.message}`);
          toastr.success(`${tracker.message}`);
          this.router.navigate(['/trackers'], { replaceUrl: true });
        },
        (error) => {
          log.debug(`Tracker Entry error: ${error}`);
          this.error = error;
        }
      );
  }

  private createForm() {
    this.entryForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      taskId: ['', Validators.required],
      checkIn: [new Date(), Validators.required],
      checkOut: [new Date(), Validators.required],
      workNotes: ['', Validators.required],
      actualHrs: ['', Validators.required],
      billableHrs: ['', Validators.required],
      createBy: [this.credentialsService.credentials.username],
    });

    this.entryForm.get('createBy').disable();
  }

  private updateFormByTask(taskId: string) {
    const projectId = this.getProjectId(taskId);
    const clientId = this.getClientId(projectId);
    this.filterProject(clientId);
    this.filterTask(projectId);
    this.entryForm.patchValue({
      clientId: clientId,
      projectId: projectId,
      taskId: taskId,
    });
  }

  private updateForm(trackerEntry: ITracker) {
    this.trackerId = trackerEntry._id;
    this.view = 'Update';
    this.btnView = 'Update Tracker';
    const projectId = this.getProjectId(trackerEntry.taskId);
    const clientId = this.getClientId(projectId);
    this.filterProject(clientId);
    this.filterTask(projectId);
    this.entryForm.setValue({
      clientId: clientId,
      projectId: projectId,
      taskId: trackerEntry.taskId,
      checkIn: trackerEntry.checkIn,
      checkOut: trackerEntry.checkOut,
      workNotes: trackerEntry.workNotes,
      actualHrs: trackerEntry.actualHrs,
      billableHrs: trackerEntry.billableHrs,
      createBy: trackerEntry.createBy,
    });

    this.LoadCheckIn(trackerEntry.checkIn);
    this.LoadCheckOut(trackerEntry.checkOut);
  }

  private getClientId = (projectId: string) => {
    return this.ProjectList.find((obj) => obj._id === projectId).clientId;
  };

  private getProjectId = (taskId: string) => {
    return this.TaskList.find((obj) => obj._id === taskId).projectId;
  };
}
