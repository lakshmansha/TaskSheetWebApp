import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from '../clients/clients.component';
import { ClientsService } from './clients.service';
import { ClientsResolver } from './clients.resolver';

@NgModule({
  declarations: [ClientsComponent],
  imports: [CommonModule, TranslateModule, ClientsRoutingModule],
  providers: [ClientsService, ClientsResolver],
})
export class ClientsModule {}
