import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { UpdateInfoComponent } from './update-info/update-info.component';

@NgModule({
  declarations: [ProfileComponent, ChangePasswordComponent, ChangeEmailComponent, UpdateInfoComponent],
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, ProfileRoutingModule],
  providers: [ProfileService, ProfileResolver],
})
export class ProfileModule {}
