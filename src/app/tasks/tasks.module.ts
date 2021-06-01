import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@app/@shared';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from '../tasks/tasks.component';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';

@NgModule({
  declarations: [TasksComponent],
  imports: [CommonModule, TranslateModule, SharedModule, TasksRoutingModule],
  providers: [TasksService, TasksResolver],
})
export class TasksModule {}
