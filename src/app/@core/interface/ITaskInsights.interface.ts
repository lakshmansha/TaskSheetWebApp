export interface ITaskInsights {
    _id: string;
    trackingCode: string;
    taskType: string;
    taskName: string;
    reportedAt: Date;
    estimatedHrs: number;
    actualHrs: number;
    billableHrs: number;
}

export class TaskInsights implements ITaskInsights {
    _id: string;
    trackingCode: string;
    taskType: string;
    taskName: string;
    reportedAt: Date;
    estimatedHrs: number;
    actualHrs: number;
    billableHrs: number;

    constructor() { }
}