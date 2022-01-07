import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { FilterPipe } from './filter/filter.pipe';
import { OrderByPipe } from './order-by/order-by.pipe';
import { ToHoursPipe } from './to-hours/to-hours.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, FilterPipe, OrderByPipe, ToHoursPipe],
  exports: [LoaderComponent, FilterPipe, OrderByPipe, ToHoursPipe],
})
export class SharedModule {}
