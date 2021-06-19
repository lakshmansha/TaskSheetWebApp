import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, TranslateModule, DashboardRoutingModule],
  providers: [DashboardService],
})
export class DashboardModule {}
