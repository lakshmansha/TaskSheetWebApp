import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { ProjectEntryComponent } from './project-entry.component';
import { ProjectEntryResolver } from './project-entry.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'project/:id',
      component: ProjectEntryComponent,
      data: { title: marker('Project Entry') },
      resolve: { responses: ProjectEntryResolver },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectEntryRoutingModule {}
