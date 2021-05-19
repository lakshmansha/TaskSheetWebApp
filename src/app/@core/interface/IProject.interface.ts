export interface IProject {
  _id: string;
  clientId: string;
  projectCode: string;
  projectName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export class Project implements IProject {
  _id: string;
  createdAt: string;
  updatedAt: string;
  clientId: string;
  projectCode: string;
  projectName: string;
  description: string;

  constructor() {}
}
