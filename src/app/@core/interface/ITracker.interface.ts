export interface ITracker {
  _id: string;
  taskId: string;
  checkIn: Date;
  checkOut: Date;
  workNotes: string;
  actualHrs: number;
  billableHrs: number;
  createBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Tracker implements ITracker {
  _id: string;
  taskId: string;
  checkIn: Date;
  checkOut: Date;
  workNotes: string;
  actualHrs: number;
  billableHrs: number;
  createBy: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {}
}
