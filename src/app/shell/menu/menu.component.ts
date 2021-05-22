import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '@app/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  userName: string;
  constructor(private credentialsService: CredentialsService) {}

  ngOnInit(): void {
    this.userName = this.credentialsService.credentials.username;
  }
}
