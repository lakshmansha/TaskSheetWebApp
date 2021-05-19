import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProject } from '@app/@core/interface';
import { UtilityService } from '@app/@core';

const utility = new UtilityService();

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  ProjectList: IProject[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.PageLoad();
  }

  PageLoad() {
    this.ProjectList = this.route.snapshot.data.responses['Projects'];
  }

  displayDate(date: string) {
    return utility.getDateString(utility.getDateFrmJSON_T(date), '/');
  }
}
