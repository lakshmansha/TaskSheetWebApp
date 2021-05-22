import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Logger, UntilDestroy, untilDestroyed } from '@app/@core';
import { ClientEntryService } from './client-entry.service';

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
  error: string | undefined;
  entryForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clientEntryService: ClientEntryService
  ) {
    toastr.options = { positionClass: 'toast-top-right' };
    this.createForm();
  }

  ngOnInit(): void {}

  clientEntry() {
    this.isLoading = true;
    const client$ = this.clientEntryService.add(this.entryForm.value);
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
}
