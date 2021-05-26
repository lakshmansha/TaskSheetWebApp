import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ProjectEntryRoutingModule } from './project-entry-routing.module';
import { ProjectEntryComponent } from './project-entry.component';
import { ProjectEntryService } from './project-entry.service';
import { ProjectEntryResolver } from './project-entry.resolver';

@NgModule({
  declarations: [ProjectEntryComponent],
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, ProjectEntryRoutingModule],
  providers: [ProjectEntryService, ProjectEntryResolver],
})
export class ProjectEntryModule {}
