import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { TrackersComponent } from './trackers.component';
import { TrackersResolver } from './trackers.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'trackers',
      component: TrackersComponent,
      data: { title: marker('Trackers') },
      resolve: { responses: TrackersResolver },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackersRoutingModule {}
