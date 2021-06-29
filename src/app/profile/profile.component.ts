import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '@app/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userName: string;

  constructor(private credentialsService: CredentialsService) {}

  ngOnInit(): void {
    this.userName = this.credentialsService.credentials.username;
  }
}
