import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@app/@shared';

import { TrackersRoutingModule } from './trackers-routing.module';
import { TrackersComponent } from './trackers.component';
import { TrackersService } from './trackers.service';

@NgModule({
  declarations: [TrackersComponent],
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, SharedModule, TrackersRoutingModule],
  providers: [TrackersService, TrackersComponent],
})
export class TrackersModule {}
