import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { ClientsComponent } from './clients.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'clients', component: ClientsComponent, data: { title: marker('Clients') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
