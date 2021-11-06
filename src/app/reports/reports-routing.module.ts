import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { ReportsComponent } from './reports.component';
import { ReportsResolver } from './reports.resolver';


const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'reports',
      component: ReportsComponent,
      data: { title: marker('Reports') },
      resolve: { responses: ReportsResolver },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
