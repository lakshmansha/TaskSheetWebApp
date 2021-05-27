import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, TranslateModule, ProfileRoutingModule],
  providers: [ProfileService, ProfileResolver],
})
export class ProfileModule {}
