import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { FilterPipe } from './filter/filter.pipe';
import { OrderByPipe } from './order-by/order-by.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, FilterPipe, OrderByPipe],
  exports: [LoaderComponent, FilterPipe, OrderByPipe],
})
export class SharedModule {}
