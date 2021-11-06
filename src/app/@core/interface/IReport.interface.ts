export interface IReport {
    createdAt: Date;
    projectName: string;
    taskName: string;  
    workNotes: string;  
    actualHrs: number;
    billableHrs: number;
  }
  
  export class Report implements IReport {
    createdAt: Date;
    projectName: string;
    taskName: string;
    workNotes: string;
    actualHrs: number;
    billableHrs: number;
    constructor() {}
  }

  export interface IExcelTemplate {
    Date: Date;
    Project: string;
    Task: string;
    ActualHrs: string;
    BillableHrs: string;
    Notes: string;
  }

  export class ExcelTemplate implements IExcelTemplate {
    Date: Date;
    Project: string;
    Task: string;
    ActualHrs: string;
    BillableHrs: string;
    Notes: string;
    
    constructor(data: Report) {
      this.Date = data.createdAt;
      this.Project = data.projectName;
      this.Task = data.taskName;
      this.ActualHrs = (data.actualHrs / 60).toFixed(2);
      this.BillableHrs = (data.billableHrs / 60).toFixed(2);
      this.Notes = data.workNotes;   
    }
  }