import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from '../projects/projects.component';
import { ProjectsService } from './projects.service';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [CommonModule, TranslateModule, ProjectsRoutingModule],
  providers: [ProjectsService],
})
export class ProjectsModule {}
