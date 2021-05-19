import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from '../clients/clients.component';
import { ClientsService } from './clients.service';

@NgModule({
  declarations: [ClientsComponent],
  imports: [CommonModule, TranslateModule, ClientsRoutingModule],
  providers: [ClientsService],
})
export class ClientsModule {}
