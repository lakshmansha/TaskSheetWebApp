import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Logger, UntilDestroy, untilDestroyed } from '@app/@core';
import { ClientEntryService } from './client-entry.service';
import { IClient } from '@app/@core/interface';

const log = new Logger('Client Entry');

declare global {
  interface Window {
    toastr: any;
  }
}

let toastr = window.toastr; // ok now

@UntilDestroy()
@Component({
  selector: 'app-client-entry',
  templateUrl: './client-entry.component.html',
  styleUrls: ['./client-entry.component.scss'],
})
export class ClientEntryComponent implements OnInit {
  //#region Switch Variables

  view: string;
  btnView: string;

  //#endregion

  error: string | undefined;
  entryForm!: FormGroup;
  isLoading = false;
  clientId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clientEntryService: ClientEntryService
  ) {
    toastr.options = { positionClass: 'toast-top-right' };
    this.createForm();
  }

  ngOnInit(): void {
    const clientEntry = this.route.snapshot.data.responses['Entry'];
    if (clientEntry !== undefined) {
      this.updateForm(clientEntry);
    } else {
      this.clientId = '';
      this.btnView = 'Create new Client';
      this.view = 'Add';
    }
  }

  clientEntry() {
    this.isLoading = true;
    const client$ =
      this.clientId !== ''
        ? this.clientEntryService.update(this.clientId, this.entryForm.value)
        : this.clientEntryService.add(this.entryForm.value);
    client$
      .pipe(
        finalize(() => {
          this.entryForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (client) => {
          log.debug(`${client.message}`);
          toastr.success(`${client.message}`);
          this.router.navigate(['/clients'], { replaceUrl: true });
        },
        (error) => {
          log.debug(`Client Entry error: ${error}`);
          this.error = error;
        }
      );
  }

  private createForm() {
    this.entryForm = this.formBuilder.group({
      clientCode: ['', Validators.required],
      clientName: ['', Validators.required],
    });
  }

  private updateForm(clientEntry: IClient) {
    this.clientId = clientEntry._id;
    this.view = 'Update';
    this.btnView = 'Update Client';
    this.entryForm.setValue({
      clientCode: clientEntry.clientCode,
      clientName: clientEntry.clientName,
    });
  }
}
