import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Logger, UntilDestroy, untilDestroyed } from '@app/@core';

import { ProfileService } from '../profile.service';

const log = new Logger('Change Password');

declare global {
  interface Window {
    toastr: any;
  }
}
let toastr = window.toastr; // ok now

declare var $: any;

@UntilDestroy()
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  error: string | undefined;
  changePasswordForm!: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService) {
    toastr.options = { positionClass: 'toast-top-right' };
    this.createForm();
  }

  ngOnInit(): void {}

  changePassword() {
    this.isLoading = true;
    const changePassword$ = this.profileService.changePassword(this.changePasswordForm.value);
    changePassword$
      .pipe(
        finalize(() => {
          this.changePasswordForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (changed) => {
          log.debug(`${changed.message}`);
          toastr.success(`User Password Changed Successfully`);
          this.changePasswordForm.reset();
        },
        (error) => {
          log.debug(`User Password error: ${error}`);
          this.error = error;
        }
      );
  }

  isOkay(group: FormGroup) {
    // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : { notSame: true };
  }

  // All is this method
  onPasswordChange() {
    if (this.confirm_password.value == this.password.value) {
      this.confirm_password.setErrors(null);
    } else {
      this.confirm_password.setErrors({ mismatch: true });
    }
  }

  // getting the form control elements
  get password(): AbstractControl {
    return this.changePasswordForm.controls['password'];
  }

  get confirm_password(): AbstractControl {
    return this.changePasswordForm.controls['confirmPassword'];
  }

  private createForm() {
    this.changePasswordForm = this.formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: [''],
      },
      { validators: this.isOkay }
    );
  }
}
