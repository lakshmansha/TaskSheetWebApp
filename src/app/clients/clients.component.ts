import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IClient } from '@app/@core/interface';
import { UtilityService } from '@app/@core';

const utility = new UtilityService();

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  ClientList: IClient[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.PageLoad();
  }

  PageLoad() {
    this.ClientList = this.route.snapshot.data.responses['Clients'];
  }

  displayDate(date: string) {
    return utility.getDateString(utility.getDateFrmJSON_T(date), '/');
  }
}
