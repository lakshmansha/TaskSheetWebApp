import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';

import { ProfileComponent } from './profile.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'profile', component: ProfileComponent, data: { title: marker('User Profile') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
