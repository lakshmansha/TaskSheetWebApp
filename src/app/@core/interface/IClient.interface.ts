export interface IClient {
  _id: string;
  clientCode: string;
  clientName: string;
  createdAt: string;
  updatedAt: string;
}

export class Client implements IClient {
  _id: string;
  clientCode: string;
  clientName: string;
  createdAt: string;
  updatedAt: string;
  constructor() {}
}
