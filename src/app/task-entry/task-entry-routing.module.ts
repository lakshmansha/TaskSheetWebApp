import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { TaskEntryComponent } from './task-entry.component';
import { TaskEntryResolver } from './task-entry.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'task/:id',
      component: TaskEntryComponent,
      data: { title: marker('Task Entry') },
      resolve: { responses: TaskEntryResolver },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskEntryRoutingModule {}
