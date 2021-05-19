import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { ClientEntryComponent } from './client-entry.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'client/:id', component: ClientEntryComponent, data: { title: marker('Client Entry') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientEntryRoutingModule {}
