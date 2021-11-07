import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@app/@shared';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReportsService } from './reports.service';
import { ReportsResolver } from './reports.resolver';


@NgModule({
  declarations: [ReportsComponent],
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, NgbModule, SharedModule, ReportsRoutingModule],
  providers: [ReportsService, ReportsResolver]
})
export class ReportsModule { }
