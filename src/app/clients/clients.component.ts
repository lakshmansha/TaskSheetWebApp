import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IClient } from '@app/@core/interface';
import { Common } from '@app/@core';
import { Feature } from '@env/environment';

const com = new Common();

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  //#region Feature Flags

  CanDelete: boolean;
  CanView: boolean;

  //#endregion

  //#region Pagination

  page: number = 1;
  pageSize: number = 8;

  //#endregion

  ClientList: IClient[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.PageLoad();
  }

  PageLoad() {
    this.CanDelete = Feature.CanDelete;
    this.CanView = Feature.CanView;
    this.ClientList = this.route.snapshot.data.responses['Clients'];
  }

  displayDate(date: Date) {
    return com.getDateString(date, '/');
  }

  ToEdit(id: string) {
    this.router.navigateByUrl('/client/' + id);
  }
}
