import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';

import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'profile',
      component: ProfileComponent,
      data: { title: marker('User Profile') },
      resolve: { responses: ProfileResolver },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
