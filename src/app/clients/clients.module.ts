import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@app/@shared';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from '../clients/clients.component';
import { ClientsService } from './clients.service';
import { ClientsResolver } from './clients.resolver';

@NgModule({
  declarations: [ClientsComponent],
  imports: [CommonModule, TranslateModule, NgbModule, SharedModule, ClientsRoutingModule],
  providers: [ClientsService, ClientsResolver],
})
export class ClientsModule {}
