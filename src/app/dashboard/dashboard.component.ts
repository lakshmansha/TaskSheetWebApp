import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskInsights } from '@app/@core/interface';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  //#region Variables

  IsOnGoingLoading: boolean;
  IsBackLogLoading: boolean;
  IsCompleteLoading: boolean;

  onGoingTasks: TaskInsights[] = [];
  backlogTasks: TaskInsights[] = [];
  completedTasks: TaskInsights[] = [];

  ShowOnGoingTask: boolean;
  ShowBackLogTask: boolean;
  ShowCompleteTask: boolean;

  //#endregion

  //#region Pagination

  page: number = 1;
  pageSize: number = 8;

  OnPage: number = 1;
  OnPageSize: number = 8;

  CompPage: number = 1;
  CompPageSize: number = 8;

  //#endregion

  constructor(private router: Router, private service: DashboardService) { }

  ngOnInit(): void {
    this.pageLoad();
  }

  pageLoad() {
    this.IsOnGoingLoading = true;
    this.IsBackLogLoading = true;
    this.ShowBackLogTask = false;
    this.ShowCompleteTask = false;
    this.ShowOnGoingTask = false;
    this.service.getAllOnGoingTasks().subscribe((res) => {
      this.IsOnGoingLoading = false;
      this.onGoingTasks = res;
    });

    this.service.getAllBacklogTasks().subscribe((res) => {
      this.IsBackLogLoading = false;
      this.backlogTasks = res;
    });

    this.service.getAllCompletedTasks().subscribe((res) => {
      this.IsCompleteLoading = false;
      this.completedTasks = res;
    });
  }

  toTracker(id: string) {
    this.router.navigate(['/tracker'], { queryParams: { taskId: id } });
  }
}
