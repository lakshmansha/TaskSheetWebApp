import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Logger, UntilDestroy, untilDestroyed } from '@app/@core';

import { ProfileService } from '../profile.service';

const log = new Logger('Change Email');

declare global {
  interface Window {
    toastr: any;
  }
}
let toastr = window.toastr; // ok now

declare var $: any;

@UntilDestroy()
@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss'],
})
export class ChangeEmailComponent implements OnInit {
  error: string | undefined;
  changeEmailForm!: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService) {
    toastr.options = { positionClass: 'toast-top-right' };
    this.createForm();
  }

  ngOnInit(): void {}

  changeEmail() {
    this.isLoading = true;
    const changeEmailId$ = this.profileService.changeEmailId(this.changeEmailForm.value);
    changeEmailId$
      .pipe(
        finalize(() => {
          this.changeEmailForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (changed) => {
          log.debug(`${changed.message}`);
          toastr.success(`User Email Changed Successfully`);
          this.changeEmailForm.reset();
        },
        (error) => {
          log.debug(`User Email error: ${error}`);
          this.error = error;
        }
      );
  }

  get frmEmail() {
    return this.changeEmailForm.get('email');
  }

  private createForm() {
    this.changeEmailForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      ],
    });
  }
}
