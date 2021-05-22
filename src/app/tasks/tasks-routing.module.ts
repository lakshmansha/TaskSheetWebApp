import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { TasksComponent } from './tasks.component';
import { TasksResolver } from './tasks.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'tasks',
      component: TasksComponent,
      data: { title: marker('Tasks') },
      resolve: { responses: TasksResolver },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
