export interface IProject {
  _id: string;
  clientId: string;
  projectCode: string;
  projectName: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Project implements IProject {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  clientId: string;
  projectCode: string;
  projectName: string;
  description: string;

  constructor() {}
}
