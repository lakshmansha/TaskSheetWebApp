import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Logger, UntilDestroy, untilDestroyed } from '@app/@core';
import { ProjectEntryService } from './project-entry.service';
import { IClient, IProject } from '@app/@core/interface';

const log = new Logger('Project Entry');

declare global {
  interface Window {
    toastr: any;
  }
}

let toastr = window.toastr; // ok now

@UntilDestroy()
@Component({
  selector: 'app-project-entry',
  templateUrl: './project-entry.component.html',
  styleUrls: ['./project-entry.component.scss'],
})
export class ProjectEntryComponent implements OnInit {
  //#region Switch Variables

  view: string;
  btnView: string;
  projectId: string;

  //#endregion

  error: string | undefined;
  entryForm!: FormGroup;
  isLoading = false;
  ClientList: IClient[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private projectEntryService: ProjectEntryService
  ) {
    toastr.options = { positionClass: 'toast-top-right' };
    this.createForm();
  }

  ngOnInit(): void {
    this.PageLoad();
  }

  PageLoad() {
    this.ClientList = this.route.snapshot.data.responses['Clients'];
    const projectEntry = this.route.snapshot.data.responses['Entry'];
    if (projectEntry !== undefined) {
      this.updateForm(projectEntry);
    } else {
      this.projectId = '';
      this.btnView = 'Create new Project';
      this.view = 'Add';
    }
  }

  projectEntry() {
    this.isLoading = true;
    const project$ =
      this.projectId !== ''
        ? this.projectEntryService.update(this.projectId, this.entryForm.value)
        : this.projectEntryService.add(this.entryForm.value);
    project$
      .pipe(
        finalize(() => {
          this.entryForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (project) => {
          log.debug(`${project.message}`);
          toastr.success(`${project.message}`);
          this.router.navigate(['/projects'], { replaceUrl: true });
        },
        (error) => {
          log.debug(`Project Entry error: ${error}`);
          this.error = error;
        }
      );
  }

  private createForm() {
    this.entryForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectCode: ['', Validators.required],
      projectName: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  private updateForm(projectEntry: IProject) {
    this.projectId = projectEntry._id;
    this.view = 'Update';
    this.btnView = 'Update Project';
    this.entryForm.setValue({
      clientId: projectEntry.clientId,
      projectCode: projectEntry.projectCode,
      projectName: projectEntry.projectName,
      description: projectEntry.description,
    });
  }
}
