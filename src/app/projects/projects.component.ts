import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProject } from '@app/@core/interface';
import { Common } from '@app/@core';
import { Feature } from '@env/environment';

const com = new Common('Projects');

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  //#region Feature Flags

  CanDelete: boolean;
  CanView: boolean;

  //#endregion

  //#region Pagination

  page: number = 1;
  pageSize: number = 8;

  //#endregion

  ProjectList: IProject[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.PageLoad();
  }

  PageLoad() {
    this.CanDelete = Feature.CanDelete;
    this.CanView = Feature.CanView;
    this.ProjectList = this.route.snapshot.data.responses['Projects'];
  }

  displayDate(date: Date) {
    return com.getDateString(date, '/');
  }

  ToEdit(id: string) {
    this.router.navigateByUrl('/project/' + id);
  }
}
