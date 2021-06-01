import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ITask } from '@app/@core/interface';
import { Common } from '@app/@core';
import { Feature } from '@env/environment';

const com = new Common('Tasks');

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  //#region Feature Flags

  CanDelete: boolean;
  CanView: boolean;
  MapTracker: boolean;

  //#endregion

  TaskList: ITask[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.PageLoad();
  }

  PageLoad() {
    this.CanDelete = Feature.CanDelete;
    this.CanView = Feature.CanView;
    this.MapTracker = Feature.Tasks.MapTracker;
    this.TaskList = this.route.snapshot.data.responses['Tasks'];
  }

  displayDate(date: Date) {
    return com.getDateString(date, '/');
  }

  ToEdit(id: string) {
    this.router.navigateByUrl('/task/' + id);
  }

  setNewTracker(status: string) {
    return status === 'In-Progress';
  }

  ToTracker(id: string) {
    this.router.navigate(['/tracker'], { queryParams: { taskId: id } });
  }
}
