export interface IClient {
  _id: string;
  clientCode: string;
  clientName: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Client implements IClient {
  _id: string;
  clientCode: string;
  clientName: string;
  createdAt: Date;
  updatedAt: Date;
  constructor() {}
}
