import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { TrackerEntryRoutingModule } from './tracker-entry-routing.module';
import { TrackerEntryComponent } from './tracker-entry.component';
import { TrackersResolver } from '@app/trackers/trackers.resolver';
import { TrackersService } from '@app/trackers/trackers.service';

@NgModule({
  declarations: [TrackerEntryComponent],
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, TrackerEntryRoutingModule],
  providers: [TrackersService, TrackersResolver],
})
export class TrackerEntryModule {}
