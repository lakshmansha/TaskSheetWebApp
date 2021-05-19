import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Logger, UntilDestroy, untilDestroyed } from '@app/@core';
import { environment } from '@env/environment';

import { RegisterService } from './register.service';

const log = new Logger('Register');

@UntilDestroy()
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  registerForm!: FormGroup;
  isLoading = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private registerService: RegisterService) {
    this.createForm();
  }

  ngOnInit(): void {}

  register() {
    this.isLoading = true;
    const register$ = this.registerService.register(this.registerForm.value);
    register$
      .pipe(
        finalize(() => {
          this.registerForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (register) => {
          log.debug(`${register.message}`);
          this.router.navigate(['/'], { replaceUrl: true });
        },
        (error) => {
          log.debug(`Register error: ${error}`);
          this.error = error;
        }
      );
  }

  isOkay(group: FormGroup) {
    // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    const agree = group.get('agree').value;

    return password === confirmPassword && agree ? null : { notSame: true };
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
    return this.registerForm.controls['password'];
  }

  get confirm_password(): AbstractControl {
    return this.registerForm.controls['confirmPassword'];
  }

  private createForm() {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: [''],
        agree: [false, Validators.required],
      },
      { validators: this.isOkay }
    );
  }
}
