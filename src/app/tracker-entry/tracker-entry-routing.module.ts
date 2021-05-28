import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { TrackerEntryComponent } from './tracker-entry.component';
import { TrackerEntryResolver } from './tracker-entry.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'tracker/:id',
      component: TrackerEntryComponent,
      data: { title: marker('Tracker Update') },
      resolve: { responses: TrackerEntryResolver },
    },
    {
      path: 'tracker',
      component: TrackerEntryComponent,
      data: { title: marker('Tracker Add') },
      resolve: { responses: TrackerEntryResolver },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackerEntryRoutingModule {}
