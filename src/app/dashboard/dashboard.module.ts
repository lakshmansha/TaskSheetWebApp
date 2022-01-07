import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@app/@shared';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, TranslateModule, NgbModule, SharedModule, DashboardRoutingModule],
  providers: [DashboardService],
})
export class DashboardModule {}
