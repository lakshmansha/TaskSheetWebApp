import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@app/@shared';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from '../projects/projects.component';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, NgbModule, SharedModule, ProjectsRoutingModule],
  providers: [ProjectsService, ProjectsResolver],
})
export class ProjectsModule {}
