import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { TaskEntryRoutingModule } from './task-entry-routing.module';
import { TaskEntryComponent } from './task-entry.component';
import { TaskEntryService } from './task-entry.service';
import { TaskEntryResolver } from './task-entry.resolver';

@NgModule({
  declarations: [TaskEntryComponent],
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, TaskEntryRoutingModule],
  providers: [TaskEntryService, TaskEntryResolver],
})
export class TaskEntryModule {}
