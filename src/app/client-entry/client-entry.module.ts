import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ClientEntryRoutingModule } from './client-entry-routing.module';
import { ClientEntryComponent } from './client-entry.component';
import { ClientEntryService } from './client-entry.service';
import { ClientEntryResolver } from './client-entry.resolver';

@NgModule({
  declarations: [ClientEntryComponent],
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, ClientEntryRoutingModule],
  providers: [ClientEntryService, ClientEntryResolver],
})
export class ClientEntryModule {}
