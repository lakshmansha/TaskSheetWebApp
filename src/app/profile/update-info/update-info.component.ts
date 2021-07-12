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
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss'],
})
export class UpdateInfoComponent implements OnInit {
  error: string | undefined;
  changeForm!: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService) {
    toastr.options = { positionClass: 'toast-top-right' };
    this.createForm();
  }

  ngOnInit(): void {}

  updateInfo() {
    this.isLoading = true;
    const change$ = this.profileService.change(this.changeForm.value);
    change$
      .pipe(
        finalize(() => {
          this.changeForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (changed) => {
          log.debug(`${changed.message}`);
          toastr.success(`${changed.message}`);
          this.changeForm.reset();
        },
        (error) => {
          log.debug(`User error: ${error}`);
          this.error = error;
        }
      );
  }

  get frmUserName() {
    return this.changeForm.get('username');
  }

  private createForm() {
    this.changeForm = this.formBuilder.group({
      username: ['', Validators.required],
      designation: [''],
      aboutMe: [''],
    });
  }
}
