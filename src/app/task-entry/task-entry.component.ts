import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Logger, UntilDestroy, untilDestroyed } from '@app/@core';
import { IClient, IProject } from '@app/@core/interface';
import { TaskEntryService } from './task-entry.service';
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
  selector: 'app-task-entry',
  templateUrl: './task-entry.component.html',
  styleUrls: ['./task-entry.component.scss'],
})
export class TaskEntryComponent implements OnInit {
  error: string | undefined;
  entryForm!: FormGroup;
  isLoading = false;
  ClientList: IClient[] = [];
  ProjectList: IProject[] = [];
  TaskTypeList: string[] = [];
  StatusList: string[] = [];
  filteredProject: IProject[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private taskEntryService: TaskEntryService,
    private credentialsService: CredentialsService
  ) {
    toastr.options = { positionClass: 'toast-top-right' };
    this.createForm();
  }

  ngOnInit(): void {
    this.PageLoad();

    $('#reportedAt').datetimepicker({
      format: 'L',
      defaultDate: new Date(),
    });

    $('#reportedAt').on('change.datetimepicker', (e: any) => {
      var formatedValue = e.date._d;

      this.entryForm.setValue({
        reportedAt: formatedValue,
      });
      console.log(formatedValue);
    });
  }

  PageLoad() {
    this.ClientList = this.route.snapshot.data.responses['Clients'];
    this.ProjectList = this.route.snapshot.data.responses['Projects'];
    this.TaskTypeList = this.route.snapshot.data.responses['TaskType'];
    this.StatusList = this.route.snapshot.data.responses['Status'];
    this.assignCopy();
  }

  assignCopy() {
    this.filteredProject = Object.assign([]);
  }

  filterProject(id: string) {
    if (!id) {
      this.assignCopy();
    } // when nothing has typed
    this.filteredProject = Object.assign([], this.ProjectList).filter((item) => item.clientId === id);
  }

  taskEntry() {
    this.isLoading = true;
    const task$ = this.taskEntryService.add(this.entryForm.value);
    task$
      .pipe(
        finalize(() => {
          this.entryForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (task) => {
          log.debug(`${task.message}`);
          toastr.success(`${task.message}`);
          this.router.navigate(['/tasks'], { replaceUrl: true });
        },
        (error) => {
          log.debug(`Task Entry error: ${error}`);
          this.error = error;
        }
      );
  }

  private createForm() {
    this.entryForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      trackingCode: ['', Validators.required],
      taskType: ['', Validators.required],
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      resource: [this.credentialsService.credentials.username, Validators.required],
      estimatedHrs: ['', Validators.required],
      status: ['', Validators.required],
      reportedAt: [new Date(), Validators.required],
    });
  }
}
