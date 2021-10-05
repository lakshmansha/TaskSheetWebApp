export interface IReport {
    createdAt: Date;
    projectName: string;
    taskName: string;    
    actualHrs: number;
    billableHrs: number;
  }
  
  export class Report implements IReport {
    createdAt: Date;
    projectName: string;
    taskName: string;
    actualHrs: number;
    billableHrs: number;
    constructor() {}
  }