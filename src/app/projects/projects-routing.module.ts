import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'projects', component: ProjectsComponent, data: { title: marker('Projects') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
