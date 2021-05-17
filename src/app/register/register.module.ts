import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { I18nModule } from '@app/i18n';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from '../register/register.component';
import { RegisterService } from './register.service';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, NgbModule, I18nModule, RegisterRoutingModule],
  providers: [RegisterService],
})
export class RegisterModule {}
