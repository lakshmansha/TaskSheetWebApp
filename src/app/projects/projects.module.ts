import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@app/@shared';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from '../projects/projects.component';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [CommonModule, TranslateModule, SharedModule, ProjectsRoutingModule],
  providers: [ProjectsService, ProjectsResolver],
})
export class ProjectsModule {}
