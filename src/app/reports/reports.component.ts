import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Common, Logger } from '@app/@core';

import { IClient, IReport } from '@app/@core/interface';
import { ReportsService } from './reports.service';

const log = new Logger('Report Component');
const com = new Common('Report Component');

declare var $: any;

declare var moment: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  //#region Filter Variables

  filterForm!: FormGroup;

  //#endregion

  ClientList: IClient[] = [];
  ReportData: IReport[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private service: ReportsService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.PageLoad();
    this.LoadPicker();
  }

  PageLoad() {
    this.ClientList = this.route.snapshot.data.responses['Clients'];
  }

  LoadPicker() {
    const start = moment().subtract(29, 'days');

    this.filterForm.patchValue({
      fromDate: start.format('YYYY-MM-DD'),
      toDate: moment().format('YYYY-MM-DD')
    });

    $('.daterange').daterangepicker({
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      startDate: start,
      endDate: moment()
    }, (start: any, end: any) => {
      // eslint-disable-next-line no-alert
      log.info('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))

      this.filterForm.patchValue({
        fromDate: start.format('YYYY-MM-DD'),
        toDate: end.format('YYYY-MM-DD')
      });
    });  
  }

  displayDate(date: Date) {
    return com.getDateString(date, '/');
  }

  displayTime(date: Date) {
    return com.getTimeString(date);
  }

  search() {
    const search$ = this.service.search(this.filterForm.value);
    search$.subscribe(
      (data) => {
        this.ReportData = data;
      }
    )
  }

  private createForm() {
    this.filterForm = this.formBuilder.group({
      clientId: [null],
      fromDate: [null],
      toDate: [null]
    });
  }
}
