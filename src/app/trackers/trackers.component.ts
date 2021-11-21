import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ITask, ITracker } from '@app/@core/interface';
import { Common } from '@app/@core';
import { Feature } from '@env/environment';
import { FormBuilder, FormGroup } from '@angular/forms';

const com = new Common('Trackers');

@Component({
  selector: 'app-trackers',
  templateUrl: './trackers.component.html',
  styleUrls: ['./trackers.component.scss'],
})
export class TrackersComponent implements OnInit {
  //#region Feature Flags

  CanDelete: boolean;
  CanView: boolean;

  //#endregion

  //#region Filter Variables

  filterForm!: FormGroup;

  //#endregion

  //#region Pagination

  page: number = 1;
  pageSize: number = 7;

  //#endregion

  TrackerList: ITracker[] = [];
  TaskList: ITask[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.PageLoad();
  }

  PageLoad() {
    this.CanDelete = Feature.CanDelete;
    this.CanView = Feature.CanView;
    this.TrackerList = this.route.snapshot.data.responses['Trackers'];
    this.TaskList = this.route.snapshot.data.responses['Tasks'];
  }

  displayDate(date: Date) {
    return com.getDateString(date, '/');
  }

  displayTime(date: Date) {
    return com.getTimeString(date);
  }

  ToEdit(id: string) {
    this.router.navigateByUrl('/tracker/' + id);
  }

  private createForm() {
    this.filterForm = this.formBuilder.group({
      taskId: [''],
    });
  }

  currentListLength() {
    return com.IsValid(this.filterForm.get('taskId').value) ? this.TrackerList.filter((obj) => obj.taskId === this.filterForm.get('taskId').value).length : this.TrackerList.length;
  }
}
