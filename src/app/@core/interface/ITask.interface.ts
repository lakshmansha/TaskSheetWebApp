export interface ITask {
  _id: string;
  projectId: string;
  trackingCode: string;
  taskType: string;
  taskName: string;
  description: string;
  reportedAt: Date;
  resource: string;
  estimatedHrs: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Task implements ITask {
  _id: string;
  projectId: string;
  trackingCode: string;
  taskType: string;
  taskName: string;
  description: string;
  reportedAt: Date;
  resource: string;
  estimatedHrs: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() { }
}