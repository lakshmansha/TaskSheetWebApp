import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Common } from '@app/@core';
import { IUser, UserStats } from '@app/@core/interface';
import { CredentialsService } from '@app/auth';

const com = new Common();

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: IUser;
  userStats: UserStats;

  constructor(private route: ActivatedRoute, private credentialsService: CredentialsService) {}

  ngOnInit(): void {
    this.user = this.credentialsService.profile;
    this.userStats = this.route.snapshot.data.responses['UserStats'];
  }

  displayDate(date: Date) {
    return com.getDateString(date, 'spec');
  }
}
